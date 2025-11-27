// ==========================================
// Navigation Menu Handler - Shared across all pages
// ==========================================

function initializeNavigation() {
    const menuBtn = document.querySelector(".menu-icon span");
    const searchBtn = document.querySelector(".search-icon");
    const cancelBtn = document.querySelector(".cancel-icon");
    const items = document.querySelector(".nav-items");
    const form = document.querySelector("form");

    // Check if navigation elements exist on this page
    if (!menuBtn || !items) return;

    // Menu button click - Open mobile menu
    menuBtn.onclick = () => {
        items.classList.add("active");
        menuBtn.classList.add("hide");
        if (searchBtn) searchBtn.classList.add("hide");
        if (cancelBtn) cancelBtn.classList.add("show");
    };

    // Cancel button click - Close menu/search
    if (cancelBtn) {
        cancelBtn.onclick = () => {
            items.classList.remove("active");
            menuBtn.classList.remove("hide");
            if (searchBtn) searchBtn.classList.remove("hide");
            cancelBtn.classList.remove("show");
            if (form) form.classList.remove("active");
            cancelBtn.style.color = "#ff3d00";
        };
    }

    // Search button click - Open search
    if (searchBtn) {
        searchBtn.onclick = () => {
            if (form) form.classList.add("active");
            searchBtn.classList.add("hide");
            if (cancelBtn) cancelBtn.classList.add("show");
        };
    }
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
    initializeNavigation();
}
