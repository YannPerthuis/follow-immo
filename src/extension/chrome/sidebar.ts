// Sidebar script for Follow Immo extension
console.log('Follow Immo sidebar loaded');

// Initialize sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const closeSidebarBtn = document.getElementById('close-sidebar');
  const openBackOfficeBtn = document.getElementById('open-back-office-from-sidebar');
  const adsList = document.getElementById('ads-list');

  // Close sidebar
  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener('click', () => {
      // TODO: Implement sidebar close
      console.log('Close sidebar clicked');
    });
  }

  // Open back office from sidebar
  if (openBackOfficeBtn) {
    openBackOfficeBtn.addEventListener('click', () => {
      chrome.tabs.create({
        url: chrome.runtime.getURL('back-office.html')
      });
    });
  }

  // Load and display followed ads
  // TODO: Implement ads loading from storage
  if (adsList) {
    console.log('Ads list container found');
  }
}); 