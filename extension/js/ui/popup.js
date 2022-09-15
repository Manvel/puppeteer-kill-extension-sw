chrome.runtime.sendMessage({message: "status"}, (response) => {
  document.querySelector("#status").textContent = response.message;
});
