// ==========================================
// Splash Screen Animation (index.html only)
// ==========================================

function initialSetup() {
    const startSection = document.getElementById("start");
    const imgSection = document.getElementById('img');
    
    if (startSection) {
        startSection.style.display = 'none';
        setTimeout(() => {
            startSection.style.display = 'block';
        }, 3000);
    }
    
    if (imgSection) {
        setTimeout(() => {
            imgSection.style.display = 'none';
        }, 3000);
    }
}

// Run setup on page load
initialSetup();

