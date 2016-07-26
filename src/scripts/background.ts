
/// <reference path="../../typings/chrome/chrome.d.ts" />
'use strict';
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
				console.log("Tab " + tabId + " is SharePoint!");
				chrome.browserAction.enable(tabId);
				chrome.browserAction.setBadgeText({text:'',tabId:tabId});
				chrome.browserAction.setTitle({title:'Click to show the Properties modal.',tabId:tabId});
			}else{
				console.log("Tab " + tabId + " is not SharePoint!");
				chrome.browserAction.disable(tabId);
				chrome.browserAction.setBadgeText({text:'X',tabId:tabId});
				chrome.browserAction.setTitle({title:'DISABLED - Not a SharePoint site.',tabId:tabId});
			}
		});
  }
});