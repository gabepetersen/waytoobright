// init button with user's preferred color
const changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('colorData', ({ colorData }) => {
  changeColor.style.backgroundColor = colorData.background;
});

// when button is clicked, inject styles
changeColor.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor
  });
});

// executed as a content script inside the current page
function setPageBackgroundColor() {
  chrome.storage.sync.get('colorData', ({ colorData }) => {
    const style = document.createElement('style');

    style.textContent = `
      * {
        border-color: ${colorData.content} !important;
        color: ${colorData.content} !important;
      }

      *:is(a, area, input, select, textarea, button, iframe, [tabindex='0']) {
        color: ${colorData.content} !important;
      }

      *:is(a, area, input, select, textarea, button, iframe, [tabindex='0']):focus {
        border: 2px solid ${colorData.focus} !important;
        color: ${colorData.focus} !important;
      }

      :not(:is(a, area, input, select, textarea, button, iframe, [tabindex='0'])) {
        background-color: ${colorData.background} !important;
      }
    `;

    document.head.appendChild(style);
  })
}
