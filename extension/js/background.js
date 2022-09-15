chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "status")
      sendResponse({message: "Service worker is awake! 🎉"});
  }
);
