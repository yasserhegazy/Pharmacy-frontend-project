// ==========================================
// Home Page View Switcher (home.html, categories.html)
// ==========================================

// Utility function to hide/show sections
function showSection(sectionId, backgroundColor = "#F4F4F2") {
    // Hide all sections
    const sections = ['hero', 'products', 'profile', 'uploade', 'myorder', 'h2'];
    sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.style.display = 'none';
    });

    // Hide form if exists
    const forms = document.getElementsByTagName("form");
    if (forms.length > 0) forms[0].style.display = 'none';

    // Show requested section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.style.display = 'block';

    // Set background color
    document.body.style.backgroundColor = backgroundColor;
}

// Initialize page switchers
function initializePageSwitchers() {
    // Profile button
    const profileBtn = document.getElementById("clk");
    if (profileBtn) {
        profileBtn.onclick = () => showSection('profile', '#292f36');
    }

    // Upload button
    const uploadBtn = document.getElementById("click1");
    if (uploadBtn) {
        uploadBtn.onclick = () => showSection('uploade', '#F4F4F2');
    }

    // My Order button (in profile sidebar)
    const orderBtn = document.getElementById("order");
    if (orderBtn) {
        orderBtn.onclick = () => showSection('myorder', '#292f36');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePageSwitchers);
} else {
    initializePageSwitchers();
}
