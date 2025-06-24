// Background service worker for Follow Immo Chrome extension
// Handles extension lifecycle and background tasks

chrome.runtime.onInstalled.addListener(() => {
  console.log('Follow Immo extension installed');
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handle different message types here
  switch (request.type) {
    case 'SAVE_AD':
      // Handle ad saving logic
      console.log('Saving ad:', request.data);
      sendResponse({ success: true });
      break;
    default:
      console.log('Unknown message type:', request.type);
      sendResponse({ success: false, error: 'Unknown message type' });
  }
});

export {}; 