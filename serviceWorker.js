let colorOverride = {
  background: "#111111",
  content: "#FFFFFF",
  focus: "#E9B61A"
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ colorData: colorOverride })
});
