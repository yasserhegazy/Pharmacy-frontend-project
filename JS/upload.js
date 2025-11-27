// ==========================================// ==========================================

// Upload Product with Backend Integration// Upload Product Functionality

// ==========================================// ==========================================



// Check authentication and superuser status on page load// Image preview functionality

document.addEventListener('DOMContentLoaded', async function() {const productImage = document.getElementById('productImage');

    const token = API.Auth.getToken();const fileName = document.getElementById('fileName');

    const imagePreview = document.getElementById('imagePreview');

    if (!token) {

        alert('Please login first');if (productImage) {

        window.location.href = 'login.html';    productImage.addEventListener('change', function(e) {

        return;        const file = e.target.files[0];

    }        

            if (file) {

    try {            // Update file name display

        const superuserCheck = await API.Auth.checkSuperuser(token);            fileName.textContent = file.name;

        if (!superuserCheck.is_superuser) {            

            alert('Access denied. Only administrators can upload products.');            // Create image preview

            window.location.href = 'home.html';            const reader = new FileReader();

            return;            reader.onload = function(event) {

        }                imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;

    } catch (error) {            };

        alert('Session expired. Please login again.');            reader.readAsDataURL(file);

        API.Auth.logout();        } else {

        return;            fileName.textContent = 'No file chosen';

    }            imagePreview.innerHTML = '';

            }

    // Load categories    });

    await loadCategories();}

    

    // Initialize form// Form submission

    initializeUploadForm();const uploadForm = document.getElementById('uploadForm');

});

if (uploadForm) {

// Load categories from backend    uploadForm.addEventListener('submit', function(e) {

async function loadCategories() {        e.preventDefault();

    try {        

        const categories = await API.Categories.getCategories();        // Get form data

        const categorySelect = document.querySelector('select[name="productCategory"]');        const formData = new FormData(uploadForm);

                

        if (categorySelect) {        // Get all form values

            categorySelect.innerHTML = '<option value="">Select Category</option>';        const productData = {

            categories.forEach(cat => {            name: formData.get('productName'),

                const option = document.createElement('option');            category: formData.get('productCategory'),

                option.value = cat.id;            price: formData.get('productPrice'),

                option.textContent = cat.name;            dosage: formData.get('productDosage'),

                categorySelect.appendChild(option);            description: formData.get('productDescription'),

            });            stock: formData.get('productStock'),

        }            prescriptionRequired: formData.get('prescriptionRequired') === 'on',

    } catch (error) {            image: formData.get('productImage')

        console.error('Failed to load categories:', error);        };

        showMessage('Failed to load categories', 'error');        

    }        // Validate all fields

}        if (!productData.name || !productData.category || !productData.price || 

            !productData.dosage || !productData.description || !productData.stock) {

// Initialize upload form            showMessage('Please fill in all required fields!', 'error');

function initializeUploadForm() {            return;

    const productImage = document.getElementById('productImage');        }

    const fileName = document.getElementById('fileName');        

    const imagePreview = document.getElementById('imagePreview');        if (!productData.image || productData.image.size === 0) {

    const uploadForm = document.getElementById('uploadForm');            showMessage('Please select a product image!', 'error');

                return;

    // Image preview        }

    if (productImage) {        

        productImage.addEventListener('change', function(e) {        // Validate price

            const file = e.target.files[0];        if (parseFloat(productData.price) <= 0) {

                        showMessage('Price must be greater than 0!', 'error');

            if (file) {            return;

                fileName.textContent = file.name;        }

                        

                const reader = new FileReader();        // Validate stock

                reader.onload = function(event) {        if (parseInt(productData.stock) < 0) {

                    imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;            showMessage('Stock cannot be negative!', 'error');

                };            return;

                reader.readAsDataURL(file);        }

            } else {        

                fileName.textContent = 'No file chosen';        // In a real application, you would send this data to a server

                imagePreview.innerHTML = '';        // For now, we'll simulate a successful upload

            }        console.log('Product Data:', productData);

        });        

    }        // Simulate upload delay

            const submitBtn = uploadForm.querySelector('.btn-submit');

    // Form submission        submitBtn.disabled = true;

    if (uploadForm) {        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Uploading...';

        uploadForm.addEventListener('submit', async function(e) {        

            e.preventDefault();        setTimeout(() => {

                        showMessage('Product uploaded successfully!', 'success');

            const token = API.Auth.getToken();            

            const formData = new FormData(uploadForm);            // Store in localStorage (temporary solution)

                        const products = JSON.parse(localStorage.getItem('uploadedProducts') || '[]');

            // Get form values            products.push({

            const productData = {                ...productData,

                name: formData.get('productName'),                id: Date.now(),

                category_id: parseInt(formData.get('productCategory')),                uploadDate: new Date().toISOString(),

                price: parseFloat(formData.get('productPrice')),                image: URL.createObjectURL(productData.image)

                dosage: formData.get('productDosage') || null,            });

                description: formData.get('productDescription') || null,            localStorage.setItem('uploadedProducts', JSON.stringify(products));

                stock: parseInt(formData.get('productStock')),            

                requires_prescription: formData.get('prescriptionRequired') === 'on'            // Reset form

            };            uploadForm.reset();

                        fileName.textContent = 'No file chosen';

            const imageFile = formData.get('productImage');            imagePreview.innerHTML = '';

                        

            // Validate            // Re-enable button

            if (!productData.name || !productData.category_id || !productData.price || !productData.stock) {            submitBtn.disabled = false;

                showMessage('Please fill in all required fields!', 'error');            submitBtn.innerHTML = '<i class="fa-solid fa-upload"></i> Upload Product';

                return;            

            }            // Optional: Redirect to categories page after 2 seconds

                        setTimeout(() => {

            if (productData.price <= 0) {                window.location.href = 'categories.html';

                showMessage('Price must be greater than 0!', 'error');            }, 2000);

                return;        }, 1500);

            }    });

            }

            if (productData.stock < 0) {

                showMessage('Stock cannot be negative!', 'error');// Show message function

                return;function showMessage(text, type) {

            }    // Remove existing messages

                const existingMessage = document.querySelector('.message');

            // Submit    if (existingMessage) {

            const submitBtn = uploadForm.querySelector('.btn-submit');        existingMessage.remove();

            submitBtn.disabled = true;    }

            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Uploading...';    

                // Create new message

            try {    const message = document.createElement('div');

                // Create product    message.className = `message ${type}`;

                const product = await API.Products.createProduct(productData, token);    message.textContent = text;

                    

                // Upload image if provided    // Insert before form

                if (imageFile && imageFile.size > 0) {    const uploadCard = document.querySelector('.upload-card');

                    await API.Products.uploadProductImage(product.id, imageFile, token);    uploadCard.insertBefore(message, uploadCard.firstChild);

                }    

                    // Auto remove after 5 seconds

                showMessage('Product uploaded successfully!', 'success');    setTimeout(() => {

                        message.remove();

                // Reset form    }, 5000);

                uploadForm.reset();}

                fileName.textContent = 'No file chosen';

                imagePreview.innerHTML = '';// Reset button functionality

                const resetBtn = uploadForm.querySelector('.btn-reset');

                // Redirect after 2 secondsif (resetBtn) {

                setTimeout(() => {    resetBtn.addEventListener('click', function() {

                    window.location.href = 'categories.html';        fileName.textContent = 'No file chosen';

                }, 2000);        imagePreview.innerHTML = '';

                        

            } catch (error) {        // Remove any messages

                console.error('Upload failed:', error);        const existingMessage = document.querySelector('.message');

                showMessage(error.message || 'Upload failed!', 'error');        if (existingMessage) {

                submitBtn.disabled = false;            existingMessage.remove();

                submitBtn.innerHTML = '<i class="fa-solid fa-upload"></i> Upload Product';        }

            }    });

        });}

    }
    
    // Reset button
    const resetBtn = uploadForm.querySelector('.btn-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            fileName.textContent = 'No file chosen';
            imagePreview.innerHTML = '';
            
            const existingMessage = document.querySelector('.message');
            if (existingMessage) {
                existingMessage.remove();
            }
        });
    }
}

// Show message function
function showMessage(text, type) {
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    const uploadCard = document.querySelector('.upload-card');
    uploadCard.insertBefore(message, uploadCard.firstChild);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}
