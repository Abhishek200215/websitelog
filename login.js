
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const toggleLink = document.getElementById('toggle-link');
  const formTitle = document.getElementById('form-title');
  const welcomeBack = document.getElementById('welcome-back');
  const welcomeUsername = document.getElementById('welcome-username');
  const continueBtn = document.getElementById('continue-btn');

  const registerError = document.getElementById('register-error');
  const registerSuccess = document.getElementById('register-success');
  const loginError = document.getElementById('login-error');
  const loginSuccess = document.getElementById('login-success');

  function clearMessages() {
    registerError.textContent = '';
    registerSuccess.textContent = '';
    loginError.textContent = '';
    loginSuccess.textContent = '';
  }

  // Toggle between forms
  toggleLink.addEventListener('click', () => {
    clearMessages();
    if (registerForm.style.display !== 'none') {
      // Switch to login
      registerForm.style.display = 'none';
      loginForm.style.display = 'flex';
      formTitle.textContent = 'Welcome Back';
      toggleLink.textContent = "New here? Join Us";
      
      // Animation effect
      loginForm.style.animation = 'none';
      setTimeout(() => {
        loginForm.style.animation = 'fadeIn 0.5s ease';
      }, 10);
    } else {
      // Switch to register
      loginForm.style.display = 'none';
      registerForm.style.display = 'flex';
      formTitle.textContent = 'Join Our Community';
      toggleLink.textContent = 'Already a member? Sign In';
      
      // Animation effect
      registerForm.style.animation = 'none';
      setTimeout(() => {
        registerForm.style.animation = 'fadeIn 0.5s ease';
      }, 10);
    }
  });

  // Register form submission
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    clearMessages();

    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    // Validate Gmail
    const gmailPattern = /^[a-z0-9._%+-]+@gmail\.com$/;
    if (!gmailPattern.test(email)) {
      registerError.textContent = 'Please enter a valid Gmail address.';
      return;
    }

    // Validate phone
    const phonePattern = /^\+?\d{10,15}$/;
    if (!phonePattern.test(phone)) {
      registerError.textContent = 'Please enter a valid phone number with country code.';
      return;
    }

    // Check if user exists
    if (localStorage.getItem(`user_${username}`)) {
      registerError.textContent = 'Username already taken. Please choose another.';
      return;
    }

    // Store user data
    const userData = {
      email,
      phone,
      username,
      password,
      joinDate: new Date().toLocaleDateString(),
      premium: true
    };

    localStorage.setItem(`user_${username}`, JSON.stringify(userData));

    // Success animation
    registerSuccess.textContent = 'Registration successful! Welcome to our community.';
    registerForm.reset();
    
    // Show welcome briefly then switch to login
    setTimeout(() => {
      toggleLink.click();
    }, 1500);
  });

  // Login form submission
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    clearMessages();

    const username = document.getElementById('login-username').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;

    const storedUser = localStorage.getItem(`user_${username}`);
    if (!storedUser) {
      loginError.textContent = 'User not found. Please register first.';
      return;
    }

    const userData = JSON.parse(storedUser);
    if (userData.password !== password) {
      loginError.textContent = 'Incorrect password. Try again.';
      return;
    }

    // Show premium welcome screen
    welcomeUsername.textContent = userData.username;
    welcomeBack.classList.add('active');
    loginForm.reset();
  });

  // Continue button
  continueBtn.addEventListener('click', () => {
    welcomeBack.classList.remove('active');
    // Here you would typically redirect to the dashboard
     window.location.href = 'https://abhishek200215.github.io/abhishek15/';
  });

  // Add floating particles for premium effect
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = Math.random() * 5 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = 'rgba(161, 196, 253, 0.5)';
      particle.style.borderRadius = '50%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.zIndex = '0';
      
      // Animation
      particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
      particle.style.animationDelay = Math.random() * 5 + 's';
      
      container.appendChild(particle);
    }
    
    // Add floating animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0% {
          transform: translate(0, 0) rotate(0deg);
          opacity: 0.5;
        }
        50% {
          transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 50 + 20}px, ${Math.random() * 50 + 20}px) rotate(180deg);
          opacity: 1;
        }
        100% {
          transform: translate(0, 0) rotate(360deg);
          opacity: 0.5;
        }
      }
    `;
    document.head.appendChild(style);
  });
