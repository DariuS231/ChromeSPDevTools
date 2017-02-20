chrome.browserAction.disable();
chrome.browserAction.setBadgeBackgroundColor({ color: "red" });
chrome.browserAction.setBadgeText({ text: "X" });
chrome.browserAction.setTitle({ title: "DISABLED - Not a SharePoint site." });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const tabId = sender.tab.id;
    if (request.isSp) {
        chrome.browserAction.enable(tabId);
        chrome.browserAction.setBadgeText({ text: "", tabId });
        chrome.browserAction.setTitle({ title: "Click to show the Properties modal.", tabId });
    }
});
