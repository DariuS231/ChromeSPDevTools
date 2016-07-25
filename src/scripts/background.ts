
/// <reference path="../../typings/chrome/chrome.d.ts" />
'use strict';


chrome.runtime.onInstalled.addListener(function (details) {
	console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.onClicked.addListener(function (tab) {
	debugger;
	// for the current tab, inject the "inject.js" file & execute it
	chrome.tabs.executeScript(tab.id, {
		file: 'scripts/spModalLauncher.js'
	});
});