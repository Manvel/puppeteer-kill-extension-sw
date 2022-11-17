console.log("CONTENT SCRIPT LAUNCHED");

function createBtn() {
  const btn = document.createElement("button");
  btn.id = "send-rpc-msg";
  btn.addEventListener("click", () => {
    chrome.runtime.sendMessage({message: "status"}, (response) => {
      alert(response.message);
    });
  });
  btn.textContent = "Wake the extension";
  document.body.appendChild(btn);
}

chrome.runtime.onMessage.addListener((request) => {
    if (request.message === "shortcut")
      alert("Action shortcut or click on icon triggered");
  }
);

createBtn();