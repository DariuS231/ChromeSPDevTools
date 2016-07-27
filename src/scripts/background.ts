/// <reference path="../../typings/globals/chrome/index.d.ts" />
chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript(tab.id, {
		file: 'scripts/spModalLauncher.js'
	});
});

chrome.browserAction.setBadgeBackgroundColor({color:'red'});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  	if (changeInfo.status == 'complete') {
		chrome.tabs.executeScript(tabId, {
			code: 'document.querySelector(\'meta[name="GENERATOR"]\').content'
		}, function (result){
			if(result.length > 0 && result[0] === "Microsoft SharePoint"){
				chrome.browserAction.enable(tabId);
				chrome.browserAction.setBadgeText({text:'',tabId});
				chrome.browserAction.setTitle({title:'Click to show the Properties modal.',tabId});
			}else{
				chrome.browserAction.disable(tabId);
				chrome.browserAction.setBadgeText({text:'X',tabId});
				chrome.browserAction.setTitle({title:'DISABLED - Not a SharePoint site.',tabId});
			}
		});
  }
});