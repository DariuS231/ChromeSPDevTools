/*
 * SpPropertyBag.js
 * by rlv-dan (https://github.com/rlv-dan)
 * License: GPL3
*/
/// <reference path="../../../typings/sharepoint/SharePoint.d.ts" />
/// <reference path="../../../typings/microsoft-ajax/microsoft.ajax.d.ts" />

class SpPropertyBag{
    ctx: SP.ClientContext;
    web:any;
    allProperties:any;
    reloadRequired:boolean;
	refreshTableRequired:boolean;
	divContainerId:string = "divSpPropertyBag";
	divBlockContainerId:string = "divBlockSpPropertyBag";
    constructor(){
        this.reloadRequired = false;
		this.refreshTableRequired = false;
        
        this.ctx = SP.ClientContext.get_current();
        this.web = this.ctx.get_web();
        this.allProperties = this.web.get_allProperties();
        this.ctx.load(this.web);
        this.ctx.load(this.allProperties);
        
        
        let onSuccess:Function = Function.createDelegate(this,function(sender:any, err:any){this.showPropertiesDialog(this.allProperties.get_fieldValues());});
        let onError:Function = Function.createDelegate(this,function(sender:any, err:any){SP.UI.Notify.addNotification("Failed to get web properties...<br>" + err.get_message(), false);});
        this.ctx.executeQueryAsync(onSuccess, onError);
    };
	private toggleBlockModal(blockModal:Boolean){
		let html:HTMLElement = document.getElementById(this.divBlockContainerId);
		html.style.display = blockModal ? 'block' : 'none';
	};
	private refreshAllPropertiesTable(){
		this.ctx = SP.ClientContext.get_current();
        this.web = this.ctx.get_web();
        this.allProperties = this.web.get_allProperties();
        this.ctx.load(this.web);
        this.ctx.load(this.allProperties);
        
        
        let onSuccess:Function = Function.createDelegate(this,function(sender:any, err:any){
			this.refreshTableRequired = false;
			let props = this.allProperties.get_fieldValues();
			let items:Array<any> = this.getItemArray(props);
			let html:HTMLElement = document.getElementById(this.divContainerId);

			html.innerHTML = this.buildTable(items);
			this.toggleBlockModal(false);
		});
        let onError:Function = Function.createDelegate(this,function(sender:any, err:any){SP.UI.Notify.addNotification("Failed to get web properties...<br>" + err.get_message(), false);});
		this.ctx.executeQueryAsync(onSuccess, onError);
	};
	private buildTable(items: Array<any>){
		let h:string = '<hr><table style="margin: 1em;">';

		for(let i:number=0, itemsCount:number = items.length; i<itemsCount; i++) {
			h += '<tr>';
			h += '<td style="text-align: right; padding-top: 15px;"><b>' + items[i].prop + '</b></td>';
			h += '<td style="padding-top: 15px;"><input id="prop' + i + '" style="width:240px; " type="text" value="' + items[i].value + '"></inpu></td>';
			h += '<td style="padding-top: 15px;"><button onclick="_spPropertyBag.setProperty(\'' + items[i].prop + '\',\'prop' + i +'\'); return false;">Update</button></td>';
			h += '<td style="padding-top: 15px;"><button style="color: red; min-width: 1em;" onclick="_spPropertyBag.deleteProperty(\'' + items[i].prop + '\',\'prop' + i +'\'); return false;">X</button></td>';
			h += '</tr>';
		}
		h += '</table>';

		h += '<hr><h3>Add a new property:</h3>';
		h += '<div style="margin: 1em; padding-bottom: 2em;">Key: <input id="newKey"></inpu>';
		h += '&nbsp;&nbsp;&nbsp;Value: <input id="newValue"></inpu>';
		h += '&nbsp;<button onclick="_spPropertyBag.addProperty(); return false;">Add</button></div>';
		h += '<div></div>';
		h += '<div id="' + this.divBlockContainerId + '" style="display:none; position: absolute; width: 100%; height: 100%; background-color: gray; top: 0; left: 0;opacity: .8;"></div>';
		return h;
	};
    private executeChanges() {
		this.ctx.get_web().update();
		let onSuccess:Function = Function.createDelegate(this,function(sender:any, err:any){
			console.log("Web properties successfully modified");
			if(this.reloadRequired){
				window.location.reload();
			} else if(this.refreshTableRequired){
				this.refreshAllPropertiesTable();
			} else {
				this.toggleBlockModal(false);
			}
		});
        let onError:Function = Function.createDelegate(this,function(sender:any, err:any){SP.UI.Notify.addNotification("Failed to set web property!...<br>" + err.get_message(), false);});
        this.ctx.executeQueryAsync(onSuccess, onError);
	};
	private setProperty(key:string, inputId:string) {
		this.toggleBlockModal(true);
		let value = (<HTMLInputElement>document.getElementById(inputId)).value;
		this.allProperties.set_item(key, value);
		this.executeChanges();
	};
	private deleteProperty(key:string, inputId:string) {
		if (confirm('Are you sure you want to remove this property? The page will be refreshed after the property has been deleted.')) {
			this.toggleBlockModal(true);
			let table = document.getElementById(inputId).parentNode.parentNode;
			table.parentNode.removeChild(table);

			this.allProperties.set_item(key);
			this.executeChanges();
			this.reloadRequired = true;
		}
	};
	private addProperty() {
		this.toggleBlockModal(true);
		this.refreshTableRequired = true;
		let key = (<HTMLInputElement>document.getElementById("newKey")).value;
		let value = (<HTMLInputElement>document.getElementById("newValue")).value;
		(<HTMLInputElement>document.getElementById("newValue")).value = "";
		(<HTMLInputElement>document.getElementById("newKey")).value = "";
		this.allProperties.set_item(key, value);
		this.executeChanges();
	};
	private getItemArray(props: any){
		let p:any;
        let type:string;
        let items:Array<any> = [];
		for(p in props) {
			if (props.hasOwnProperty(p)) {
				type = typeof(props[p]);
				if(type === "string") {
					items.push({"prop": p, "value": props[p].replace(/"/g, '&quot;')});
				}
			}
		}
		items.sort(function(a, b) {
			return a.prop.localeCompare(b.prop);
		});

		return items;	
	};
	private showPropertiesDialog(props: any) {

		let items:Array<any> = this.getItemArray(props);
		let html:HTMLElement = document.createElement('div');
		html.id = this.divContainerId;

		html.innerHTML = this.buildTable(items);

		SP.UI.ModalDialog.showModalDialog({
		 title: "Property Bag Editor",
		 html:html,
		 showClose: true,
		 autoSize: true,
		 dialogReturnValueCallback: function(dialogResult) {
			if(this.reloadRequired){
				window.location.reload();
			}
		 }
		});
	};	
}

declare var _spPropertyBag:SpPropertyBag;

SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function(){
    _spPropertyBag = new SpPropertyBag();
});
