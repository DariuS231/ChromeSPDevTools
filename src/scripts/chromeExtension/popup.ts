/// <reference path="../../../typings/index.d.ts" />

class PopUp {
    optionSelected(url:string) {
        let codeStr = `
            (function(cdnUrl) {
                var script = HTMLScriptElement = document.createElement('script');
                script.src = cdnUrl;
                (document.head || document.documentElement).appendChild(script);
                script.parentNode.removeChild
            })('` + url + `');`;
        chrome.tabs.query({ active: true }, function (tab) {
            chrome.tabs.executeScript(tab[0].id, {
                code: codeStr
            },function(){
                window.close();
            });
        });
    }
    setClieckEvent(elementId:string, cdnUrl:string){
        let that:any = this;
        document.getElementById(elementId).addEventListener('click', function (e) {
            that.optionSelected(cdnUrl);
            return false;
        });
    }
    init() {
        // For each new version of the script file, a new URL must be generated 
        // from the https://rawgit.com/ site using the url of the specific commit 
        this.setClieckEvent('lnkPropBagAdmin', 'https://rawgit.com/DariuS231/ChromeSPPropertiesAdmin/master/dist/actions/SpPropertyBag/SpPropertyBag.js');
    }
}

let popUp: PopUp = new PopUp();

popUp.init();