
/// <reference path="../../typings/chrome/chrome.d.ts" />
'use strict';
chrome.runtime.onInstalled.addListener(function (details) {
	console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript(tab.id, {
		file: 'scripts/spModalLauncher.js'
	});
});