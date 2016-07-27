/*
 * SpPropertyBag.js
 * by rlv-dan (https://github.com/rlv-dan)
 * License: GPL3
*/
/// <reference path="../../../typings/globals/SharePoint/index.d.ts" />
/// <reference path="../../../typings/globals/microsoft.ajax/index.d.ts" />

class SpPropertyBag{
    ctx: SP.ClientContext;
    web:any;
    allProperties:any;
    reloadRequired:boolean;
	refreshTableRequired:boolean;
	divContainerId:string = "divSpPropertyBag";
	divBlockContainerId:string = "divBlockSpPropertyBag";
	per:any;
    constructor(){
        this.reloadRequired = false;
		this.refreshTableRequired = false;
        
		this.ctx = SP.ClientContext.get_current();
        this.web = this.ctx.get_web();

		if (typeof this.web.doesUserHavePermissions !== "function") {
            this.showMessageOnDialog("Unable to check permissions","Cannot check permissions against a non-securable object.");
            return;
        }
		let ob:SP.BasePermissions = new SP.BasePermissions();
        ob.set(SP.PermissionKind.manageWeb);
		this.per = this.web.doesUserHavePermissions(ob);

		let onSuccess:Function = Function.createDelegate(this,function(sender:any, err:any){
			var hasPermissions = this.per.get_value();
                if (hasPermissions) {
                    this.getWebProperties();
                }
                else {
                    this.showMessageOnDialog("No required permissions","Current user does not have the required permissions");
                }
		});
        let onError:Function = Function.createDelegate(this,function(sender:any, err:any){SP.UI.Notify.addNotification("Failed to check the current user permissions...<br>" + err.get_message(), false);});
        this.ctx.executeQueryAsync(onSuccess, onError);

    };
	private getWebProperties(){
		this.ctx = SP.ClientContext.get_current();
        this.web = this.ctx.get_web();
        this.allProperties = this.web.get_allProperties();
        this.ctx.load(this.web);
        this.ctx.load(this.allProperties);
        
        
        let onSuccess:Function = Function.createDelegate(this,function(sender:any, err:any){this.showPropertiesDialog(this.allProperties.get_fieldValues());});
        let onError:Function = Function.createDelegate(this,function(sender:any, err:any){SP.UI.Notify.addNotification("Failed to get web properties...<br>" + err.get_message(), false);});
        this.ctx.executeQueryAsync(onSuccess, onError);
	}
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
		let h:Array<string> = ['<hr><table style="margin: 1em;">'];

		for(let i:number=0, itemsCount:number = items.length; i<itemsCount; i++) {
			let item:any = items[i];
			h.push('<tr>');
			h.push('<td style="text-align: right; padding-top: 15px;"><b>' + item.prop + '</b></td>');
			h.push('<td style="padding-top: 15px;"><input id="prop' + i + '" style="width:240px; " type="text" value="' + item.value + '"></inpu></td>');
			h.push('<td style="padding-top: 15px;"><button onclick="_spPropertyBag.setProperty(\'' + item.prop + '\',\'prop' + i +'\'); return false;">Update</button></td>');
			h.push('<td style="padding-top: 15px;"><button style="color: red; min-width: 1em;" onclick="_spPropertyBag.deleteProperty(\'' + item.prop + '\',\'prop' + i +'\'); return false;">X</button></td>');
			h.push('</tr>');
		}
		h.push('</table>');

		h.push('<hr><h3>Add a new property:</h3>');
		h.push('<div style="margin: 1em; padding-bottom: 2em;">Key: <input id="newKey"></inpu>');
		h.push('&nbsp;&nbsp;&nbsp;Value: <input id="newValue"></inpu>');
		h.push('&nbsp;<button onclick="_spPropertyBag.addProperty(); return false;">Add</button></div>');
		h.push('<div></div>');
		h.push('<div id="' + this.divBlockContainerId + '" style="display:none; position: absolute; width: 100%; height: 100%; background-color: gray; top: 0; left: 0;opacity: .8;"></div>');
		return h.join('\n');
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
	private showModal(modalTitle:string, modalHtml:HTMLElement){
		SP.UI.ModalDialog.showModalDialog({
			title: modalTitle,
			html:modalHtml,
			showClose: true,
			autoSize: true,
			dialogReturnValueCallback: function(dialogResult) {
				if(this.reloadRequired){
					window.location.reload();
				}
			}
		});
	}
	private showMessageOnDialog(title:string, message:string) {
		let html:HTMLElement = document.createElement('div');
		let hr:HTMLElement = document.createElement('hr');
		let p:HTMLElement = document.createElement('p');

		html.id = this.divContainerId;
		p.textContent = message;

		html.appendChild(hr);
		html.appendChild(p);
		this.showModal(title, html);
	};
	private showPropertiesDialog(props: any) {

		let items:Array<any> = this.getItemArray(props);
		let html:HTMLElement = document.createElement('div');
		html.id = this.divContainerId;

		html.innerHTML = this.buildTable(items);

		this.showModal("Property Bag Editor", html);
	};	
}

declare var _spPropertyBag:SpPropertyBag;

SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function(){
    _spPropertyBag = new SpPropertyBag();
});
