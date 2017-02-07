chrome.browserAction.disable();
chrome.browserAction.setBadgeBackgroundColor({ color: "red" });
chrome.browserAction.setBadgeText({ text: "X" });
chrome.browserAction.setTitle({ title: "DISABLED - Not a SharePoint site." });

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.executeScript(tab.id, {
        file: "scripts/spModalLauncher.js"
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        chrome.tabs.executeScript(tabId, {
            code: `(function() {
				var meta = document.querySelector(\"meta[name="GENERATOR"]\");
				return (meta && meta.content === "Microsoft SharePoint") || (window.location.host.endsWith(".sharepoint.com"));
			})()`
        }, (result) => {
            if (result && result.length > 0 && result[0]) {
                chrome.browserAction.enable(tabId);
                chrome.browserAction.setBadgeText({ text: "", tabId });
                chrome.browserAction.setTitle({ title: "Click to show the Properties modal.", tabId });
            }
        });
    }
});
