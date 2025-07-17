document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            if (name.value.trim() === '') {
                alert('Please enter your name');
                name.focus();
                return;
            }
            
            if (email.value.trim() === '') {
                alert('Please enter your email');
                email.focus();
                return;
            }
            
            if (!validateEmail(email.value)) {
                alert('Please enter a valid email address');
                email.focus();
                return;
            }
            
            if (subject.value.trim() === '') {
                alert('Please enter a subject');
                subject.focus();
                return;
            }
            
            if (message.value.trim() === '') {
                alert('Please enter your message');
                message.focus();
                return;
            }
            
            // Form submission would go here
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Login form validation
    // Updated Login Form Submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Get full user details
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = 'index.html?login=success';
    } else {
      alert('Invalid credentials!');
    }
  });
}
// Check for logged-in user on homepage
// Check login status on page load
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const loginBtn = document.querySelector('.btn-login');
  const navLinks = document.querySelector('.nav-links');

  if (isLoggedIn && currentUser) {
    // Replace login button with user dropdown
    if (loginBtn) {
      loginBtn.outerHTML = `
        <li class="user-dropdown">
          <a href="#" class="user-profile">
            <i class="fas fa-user-circle"></i> ${currentUser.name.split(' ')[0]}
          </a>
          <div class="dropdown-menu">
            <p>Email: ${currentUser.email}</p>
            <p>Phone: ${currentUser.phone}</p>
            <a href="#" id="logout">Logout</a>
          </div>
        </li>
      `;
    }

    // Initialize dropdown
    const profile = document.querySelector('.user-profile');
    if (profile) {
      profile.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.dropdown-menu').classList.toggle('show');
      });
    }

    // Logout functionality
    document.getElementById('logout')?.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      window.location.href = 'index.html';
    });
  }

  // Show login success message
  if (new URLSearchParams(window.location.search).has('login')) {
    alert('Login successful! Welcome back.');
    history.replaceState(null, '', window.location.pathname);
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.user-dropdown')) {
    const dropdown = document.querySelector('.dropdown-menu');
    if (dropdown) dropdown.classList.remove('show');
  }
});

// Run on page load
window.addEventListener('DOMContentLoaded', checkLoginStatus);
    // Signup form validation
    // Signup Form
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value
    };

    // Save user data
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Save credentials (in real app, this would go to backend)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({
      email: user.email,
      password: document.getElementById('password').value
    });
    localStorage.setItem('users', JSON.stringify(users));
    
    // Show success message
    document.getElementById('success-modal').style.display = 'flex';
  });
}
    
    // Product card hover effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.product-image img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.product-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-image, .product-card, .gallery-item, .info-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.about-image, .product-card, .gallery-item, .info-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});

// Helper functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone);
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = document.querySelector(`#${inputId} + .toggle-password i`);
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}


// Cart System
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');
  
  cartItems.innerHTML = '';
  let total = 0;
  
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <p class="cart-item-price">₹${item.price} x ${item.quantity}</p>
        <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartItems.appendChild(cartItem);
    total += item.price * item.quantity;
  });
  
  cartTotal.textContent = total;
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
  alert(`${product.name} added to cart!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Initialize cart toggle
document.getElementById('cart-toggle').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('cart-sidebar').classList.add('active');
});

document.getElementById('close-cart').addEventListener('click', () => {
  document.getElementById('cart-sidebar').classList.remove('active');
});

// Update product buttons
// Update the product button event listeners
document.querySelectorAll('.btn-add').forEach((button, index) => {
  button.addEventListener('click', function() {
    const productCard = this.closest('.product-card');
    const product = {
      id: index + 1, // Unique ID for each product
      name: productCard.querySelector('h3').textContent,
      price: parseFloat(productCard.querySelector('.price').textContent.replace('₹', '')),
      image: productCard.querySelector('img').src
    };
    addToCart(product);
  });
});



// Checkout Functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  document.getElementById('cart-sidebar').classList.remove('active');
  document.getElementById('checkout-modal').style.display = 'flex';
});

document.getElementById('close-checkout').addEventListener('click', () => {
  document.getElementById('checkout-modal').style.display = 'none';
});

document.getElementById('confirm-payment').addEventListener('click', () => {
  alert('Thank you for your payment! Your order will be delivered soon.');
  cart = [];
  updateCart();
  document.getElementById('checkout-modal').style.display = 'none';
});





// Initialize cart on load
updateCart();




