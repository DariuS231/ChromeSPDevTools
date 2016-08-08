/// <reference path="../../../typings/index.d.ts" />

chrome.browserAction.disable();
chrome.browserAction.setBadgeBackgroundColor({ color: 'red' });
chrome.browserAction.setBadgeText({ text: 'X' });
chrome.browserAction.setTitle({ title: 'DISABLED - Not a SharePoint site.' });

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript(tab.id, {
		file: 'scripts/spModalLauncher.js'
	});
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'complete') {
		chrome.tabs.executeScript(tabId, {
			code: `(function() { 
				var meta = document.querySelector(\'meta[name="GENERATOR"]\');
				return meta && meta.content
			})()`
		}, function (result) {
			if (result.length > 0 && result[0] === "Microsoft SharePoint") {
				chrome.browserAction.enable(tabId);
				chrome.browserAction.setBadgeText({ text: '', tabId });
				chrome.browserAction.setTitle({ title: 'Click to show the Properties modal.', tabId });
			}
		});
	}
});