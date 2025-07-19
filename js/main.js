/**
 * AI4ALL - Main JavaScript File
 * Функционал для всего сайта: меню, формы, анимации
 */

document.addEventListener('DOMContentLoaded', function() {
  // ===== Мобильное меню =====
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Закрытие меню при клике на ссылку
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // ===== Навигация: установка активного пункта =====
  const navLinks = document.querySelectorAll('.nav a');
  // Get the current page's pathname and handle edge cases
  let currentPath = window.location.pathname.split('/').pop();
  if (currentPath === '' || currentPath === '/') {
      currentPath = 'index.html'; // Explicitly set for root URL
  }

  // Debug: Log the current path and link hrefs
  console.log('Current Path:', currentPath);
  navLinks.forEach(link => {
      console.log('Link href:', link.getAttribute('href'));
  });

  // Set active class
  navLinks.forEach(link => {
      link.classList.remove('active'); // Remove active class from all links
      const linkPath = link.getAttribute('href');
      if (linkPath === currentPath || (currentPath === 'index.html' && linkPath === 'index.html')) {
          link.classList.add('active'); // Add active class to matching link
      }
  });

  // ===== Плавная прокрутка =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Отправка форм =====
  // Контактная форма
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Валидация
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      
      if (!name || !email) {
        showAlert('Խնդրում ենք լրացնել պարտադիր դաշտերը', 'error');
        return;
      }
      
      // Имитация отправки
      showAlert('Ձեր հաղորդագրությունը հաջողությամբ ուղարկված է!', 'success');
      this.reset();
    });
  }

  // Форма регистрации на курс
  const registerForm = document.querySelector('.register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showAlert('Դուք հաջողությամբ գրանցվել եք դասընթացին', 'success');
      this.reset();
    });
  }

  // ===== Анимации при скролле =====
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.benefit-card, .course-card, .blog-post');
    
    elements.forEach(el => {
      const elPosition = el.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elPosition < screenPosition) {
        el.classList.add('animated');
      }
    })();
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Инициализация

  // ===== Вспомогательные функции =====
  function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    document.body.appendChild(alert);
    
    setTimeout(() => {
      alert.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      alert.classList.remove('show');
      setTimeout(() => alert.remove(), 300);
    }, 3000);
  }
});

// ===== Эффект "липкой" шапки =====
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
});