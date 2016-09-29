/// <reference path="../../../typings/index.d.ts" />

var enableExt = function (tabId:number) {
	chrome.browserAction.enable(tabId);
	chrome.browserAction.setBadgeText({ text: '', tabId });
	chrome.browserAction.setTitle({ title: 'Click to view the options.', tabId });
}
chrome.browserAction.disable();
chrome.browserAction.setBadgeBackgroundColor({ color: 'red' });
chrome.browserAction.setBadgeText({ text: 'X' });
chrome.browserAction.setTitle({ title: 'DISABLED - Not a SharePoint site.' });

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript(tab.id, {
		file: 'scripts/spModalLauncher.js'
	});
});

chrome.tabs.onUpdated.addListener(function (tabId:number, changeInfo:any, tab:any) {
	if (changeInfo.status == 'complete') {
		if (tab.url.indexOf('.sharepoint.com') >= 0) {
			enableExt(tabId);
		} else {
			chrome.tabs.executeScript(tabId, {
				code: `(function() { 
				var meta = document.querySelector(\'meta[name="GENERATOR"]\');
				return meta && meta.content
			})()`
			}, function (result) {
				if (result.length > 0 && !!result[0] && result[0] === "Microsoft SharePoint") {
					enableExt(tabId);
				}
			});
		}


	}
});