chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({enabled: true});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, {action: "analyze"});
  }
});