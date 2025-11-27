// ==========================================// ==========================================

// Form Validation with Backend Integration// Form Validation for Login and Sign Up

// ==========================================// ==========================================



// Email validation regex// Email validation regex

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordMinLength = 8;

// Password validation (minimum 8 characters)

function validateEmail(email) {const passwordMinLength = 8;

    return emailRegex.test(email);

}// Validate email format

function validateEmail(email) {

function validatePassword(password) {    return emailRegex.test(email);

    return password.length >= passwordMinLength;}

}

// Validate password strength

function showError(input, message) {function validatePassword(password) {

    const errorDiv = input.nextElementSibling;    return password.length >= passwordMinLength;

    if (errorDiv && errorDiv.classList.contains('error-message')) {}

        errorDiv.textContent = message;

        errorDiv.style.display = 'block';// Show error message

    } else {function showError(input, message) {

        const newErrorDiv = document.createElement('div');    const errorDiv = input.nextElementSibling;

        newErrorDiv.className = 'error-message';    if (errorDiv && errorDiv.classList.contains('error-message')) {

        newErrorDiv.textContent = message;        errorDiv.textContent = message;

        newErrorDiv.style.color = '#FF6B6B';        errorDiv.style.display = 'block';

        newErrorDiv.style.fontSize = '14px';    } else {

        newErrorDiv.style.marginTop = '5px';        const newErrorDiv = document.createElement('div');

        newErrorDiv.style.marginBottom = '10px';        newErrorDiv.className = 'error-message';

        input.parentNode.insertBefore(newErrorDiv, input.nextSibling);        newErrorDiv.textContent = message;

    }        newErrorDiv.style.color = '#FF6B6B';

    input.style.borderColor = '#FF6B6B';        newErrorDiv.style.fontSize = '14px';

}        newErrorDiv.style.marginTop = '5px';

        newErrorDiv.style.marginBottom = '10px';

function clearError(input) {        input.parentNode.insertBefore(newErrorDiv, input.nextSibling);

    const errorDiv = input.nextElementSibling;    }

    if (errorDiv && errorDiv.classList.contains('error-message')) {    input.style.borderColor = '#FF6B6B';

        errorDiv.style.display = 'none';}

    }

    input.style.borderColor = '';// Clear error message

}function clearError(input) {

    const errorDiv = input.nextElementSibling;

function showSuccessMessage(message) {    if (errorDiv && errorDiv.classList.contains('error-message')) {

    const successDiv = document.createElement('div');        errorDiv.style.display = 'none';

    successDiv.style.cssText = `    }

        position: fixed;    input.style.borderColor = '';

        top: 20px;}

        right: 20px;

        background: #4ECDC4;// Login form validation

        color: white;function initializeLoginValidation() {

        padding: 15px 25px;    const loginBtn = document.querySelector('a[id="login"]');

        border-radius: 8px;    const emailInput = document.querySelector('input[type="email"]');

        box-shadow: 0 4px 6px rgba(0,0,0,0.1);    const passwordInput = document.querySelector('input[type="password"]');

        z-index: 10000;    

    `;    if (!loginBtn || !emailInput || !passwordInput) return;

    successDiv.textContent = message;    

    document.body.appendChild(successDiv);    // Prevent default link behavior and validate

        loginBtn.addEventListener('click', (e) => {

    setTimeout(() => {        e.preventDefault();

        successDiv.remove();        let isValid = true;

    }, 3000);        

}        // Clear previous errors

        clearError(emailInput);

// Login form validation with API        clearError(passwordInput);

function initializeLoginValidation() {        

    const loginBtn = document.querySelector('a[id="login"]');        // Validate email

    const emailInput = document.querySelector('input[type="email"]');        if (!emailInput.value.trim()) {

    const passwordInput = document.querySelector('input[type="password"]');            showError(emailInput, 'Email is required');

                isValid = false;

    if (!loginBtn || !emailInput || !passwordInput) return;        } else if (!validateEmail(emailInput.value)) {

                showError(emailInput, 'Please enter a valid email address');

    loginBtn.addEventListener('click', async (e) => {            isValid = false;

        e.preventDefault();        }

        let isValid = true;        

                // Validate password

        clearError(emailInput);        if (!passwordInput.value) {

        clearError(passwordInput);            showError(passwordInput, 'Password is required');

                    isValid = false;

        // Use email as username for login        }

        const username = emailInput.value.trim();        

                // If valid, proceed to home page

        if (!username) {        if (isValid) {

            showError(emailInput, 'Username/Email is required');            // Store user session (simplified)

            isValid = false;            sessionStorage.setItem('userLoggedIn', 'true');

        }            sessionStorage.setItem('userEmail', emailInput.value);

                    window.location.href = 'home.html';

        if (!passwordInput.value) {        }

            showError(passwordInput, 'Password is required');    });

            isValid = false;}

        }

        // Sign up form validation

        if (isValid) {function initializeSignUpValidation() {

            try {    const signUpBtn = document.querySelector('a[id="login"]'); // Uses same ID as login

                loginBtn.textContent = 'Logging in...';    const usernameInput = document.querySelector('input[type="text"]');

                loginBtn.style.pointerEvents = 'none';    const emailInput = document.querySelector('input[type="email"]');

                    const passwordInputs = document.querySelectorAll('input[type="password"]');

                // Call login API    

                const response = await API.Auth.login(username, passwordInput.value);    if (!signUpBtn || !emailInput || passwordInputs.length < 2) return;

                    

                // Save token and user info    const passwordInput = passwordInputs[0];

                API.Auth.saveToken(response.access_token, response.user);    const confirmPasswordInput = passwordInputs[1];

                    

                // Check if user is superuser    signUpBtn.addEventListener('click', (e) => {

                const superuserCheck = await API.Auth.checkSuperuser(response.access_token);        e.preventDefault();

                        let isValid = true;

                showSuccessMessage(`Welcome back, ${response.user.username}!`);        

                        // Clear previous errors

                // Redirect based on user role        if (usernameInput) clearError(usernameInput);

                setTimeout(() => {        clearError(emailInput);

                    if (superuserCheck.is_superuser) {        clearError(passwordInput);

                        window.location.href = 'upload.html';        clearError(confirmPasswordInput);

                    } else {        

                        window.location.href = 'home.html';        // Validate username

                    }        if (usernameInput && !usernameInput.value.trim()) {

                }, 1000);            showError(usernameInput, 'Username is required');

                            isValid = false;

            } catch (error) {        }

                loginBtn.textContent = 'Login';        

                loginBtn.style.pointerEvents = 'auto';        // Validate email

                showError(passwordInput, error.message || 'Login failed');        if (!emailInput.value.trim()) {

            }            showError(emailInput, 'Email is required');

        }            isValid = false;

    });        } else if (!validateEmail(emailInput.value)) {

}            showError(emailInput, 'Please enter a valid email address');

            isValid = false;

// Sign up form validation with API        }

function initializeSignUpValidation() {        

    const signUpBtn = document.querySelector('a[id="login"]');        // Validate password

    const usernameInput = document.querySelector('input[type="text"]');        if (!passwordInput.value) {

    const emailInput = document.querySelector('input[type="email"]');            showError(passwordInput, 'Password is required');

    const passwordInputs = document.querySelectorAll('input[type="password"]');            isValid = false;

            } else if (!validatePassword(passwordInput.value)) {

    if (!signUpBtn || !emailInput || passwordInputs.length < 2) return;            showError(passwordInput, `Password must be at least ${passwordMinLength} characters`);

                isValid = false;

    const passwordInput = passwordInputs[0];        }

    const confirmPasswordInput = passwordInputs[1];        

            // Validate confirm password

    signUpBtn.addEventListener('click', async (e) => {        if (!confirmPasswordInput.value) {

        e.preventDefault();            showError(confirmPasswordInput, 'Please confirm your password');

        let isValid = true;            isValid = false;

                } else if (passwordInput.value !== confirmPasswordInput.value) {

        if (usernameInput) clearError(usernameInput);            showError(confirmPasswordInput, 'Passwords do not match');

        clearError(emailInput);            isValid = false;

        clearError(passwordInput);        }

        clearError(confirmPasswordInput);        

                // If valid, proceed to login page

        if (usernameInput && !usernameInput.value.trim()) {        if (isValid) {

            showError(usernameInput, 'Username is required');            alert('Account created successfully! Please login.');

            isValid = false;            window.location.href = 'login.html';

        } else if (usernameInput && usernameInput.value.trim().length < 3) {        }

            showError(usernameInput, 'Username must be at least 3 characters');    });

            isValid = false;}

        }

        // Initialize validation based on page

        if (!emailInput.value.trim()) {function initializeFormValidation() {

            showError(emailInput, 'Email is required');    const pageTitle = document.title;

            isValid = false;    

        } else if (!validateEmail(emailInput.value)) {    if (pageTitle === 'Login') {

            showError(emailInput, 'Please enter a valid email address');        initializeLoginValidation();

            isValid = false;    } else if (pageTitle === 'Sign up') {

        }        initializeSignUpValidation();

            }

        if (!passwordInput.value) {}

            showError(passwordInput, 'Password is required');

            isValid = false;// Initialize when DOM is ready

        } else if (!validatePassword(passwordInput.value)) {if (document.readyState === 'loading') {

            showError(passwordInput, `Password must be at least ${passwordMinLength} characters`);    document.addEventListener('DOMContentLoaded', initializeFormValidation);

            isValid = false;} else {

        }    initializeFormValidation();

        }

        if (!confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Please confirm your password');
            isValid = false;
        } else if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Passwords do not match');
            isValid = false;
        }
        
        if (isValid) {
            try {
                signUpBtn.textContent = 'Creating account...';
                signUpBtn.style.pointerEvents = 'none';
                
                // Call register API - NO role field (defaults to customer)
                const userData = {
                    username: usernameInput.value.trim(),
                    email: emailInput.value.trim(),
                    password: passwordInput.value
                };
                
                const response = await API.Auth.register(userData);
                
                // Save token and user info
                API.Auth.saveToken(response.access_token, response.user);
                
                showSuccessMessage('Account created successfully!');
                
                // Redirect to home (regular users can't access upload)
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
                
            } catch (error) {
                signUpBtn.textContent = 'Sign up';
                signUpBtn.style.pointerEvents = 'auto';
                showError(emailInput, error.message || 'Registration failed');
            }
        }
    });
}

// Initialize validation based on page
function initializeFormValidation() {
    const pageTitle = document.title;
    
    if (pageTitle === 'Login') {
        initializeLoginValidation();
    } else if (pageTitle === 'Sign up') {
        initializeSignUpValidation();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFormValidation);
} else {
    initializeFormValidation();
}
