chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "status")
      sendResponse({message: "Service worker is awake! 🎉"});
  }
);

chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {message: "shortcut"});
  });
});
