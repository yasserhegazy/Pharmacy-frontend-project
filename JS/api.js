// API Configuration
const API_BASE_URL = 'http://localhost:8000';
const API_V1 = `${API_BASE_URL}/api/v1`;

// Auth API
const AuthAPI = {
    async register(userData) {
        const response = await fetch(`${API_V1}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Registration failed');
        }
        
        return await response.json();
    },

    async login(username, password) {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetch(`${API_V1}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Login failed');
        }
        
        return await response.json();
    },

    async getCurrentUser(token) {
        const response = await fetch(`${API_V1}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to get user info');
        }
        
        return await response.json();
    },

    async checkSuperuser(token) {
        const response = await fetch(`${API_V1}/auth/check-superuser`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            return { is_superuser: false, can_upload: false };
        }
        
        return await response.json();
    },

    saveToken(token, user) {
        localStorage.setItem('access_token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },

    getToken() {
        return localStorage.getItem('access_token');
    },

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    },

    isLoggedIn() {
        return !!this.getToken();
    }
};

// Products API
const ProductsAPI = {
    async getProducts(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = `${API_V1}/products${queryString ? '?' + queryString : ''}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        
        return await response.json();
    },

    async getProduct(id) {
        const response = await fetch(`${API_V1}/products/${id}`);
        
        if (!response.ok) {
            throw new Error('Product not found');
        }
        
        return await response.json();
    },

    async createProduct(productData, token) {
        const response = await fetch(`${API_V1}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to create product');
        }
        
        return await response.json();
    },

    async uploadProductImage(productId, imageFile, token) {
        const formData = new FormData();
        formData.append('file', imageFile);

        const response = await fetch(`${API_V1}/products/${productId}/upload-image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to upload image');
        }
        
        return await response.json();
    },

    async updateProduct(id, productData, token) {
        const response = await fetch(`${API_V1}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to update product');
        }
        
        return await response.json();
    },

    async deleteProduct(id, token) {
        const response = await fetch(`${API_V1}/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to delete product');
        }
    }
};

// Categories API
const CategoriesAPI = {
    async getCategories() {
        const response = await fetch(`${API_V1}/categories`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        
        return await response.json();
    },

    async createCategory(categoryData, token) {
        const response = await fetch(`${API_V1}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(categoryData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to create category');
        }
        
        return await response.json();
    }
};

// Export for use in other files
window.API = {
    Auth: AuthAPI,
    Products: ProductsAPI,
    Categories: CategoriesAPI,
    BASE_URL: API_BASE_URL
};
