// Popup script for Follow Immo extension
console.log('Follow Immo popup loaded');

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const followedCountElement = document.getElementById('followed-count');
  const openBackOfficeBtn = document.getElementById('open-back-office');
  const toggleSidebarBtn = document.getElementById('toggle-sidebar');

  // Update followed ads count
  // TODO: Get actual count from storage
  if (followedCountElement) {
    followedCountElement.textContent = '0';
  }

  // Open back office
  if (openBackOfficeBtn) {
    openBackOfficeBtn.addEventListener('click', () => {
      chrome.tabs.create({
        url: chrome.runtime.getURL('back-office.html')
      });
    });
  }

  // Toggle sidebar
  if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener('click', () => {
      // TODO: Implement sidebar toggle
      console.log('Toggle sidebar clicked');
    });
  }
}); 