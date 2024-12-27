document.addEventListener('DOMContentLoaded', function() {
  // Collect page data
  const data = {
    url: window.location.href,
    title: document.title,
    forms: document.forms.length
  };
  
  // Send to background script
  chrome.runtime.sendMessage({
    action: "collect",
    data: data
  });
});