// 优化版本的JavaScript - 减少执行时间
(function() {
    'use strict';
    
    // DOM元素缓存
    let elements = {};
    
    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // 汉堡菜单切换
    if (elements.hamburger) {
        elements.hamburger.addEventListener('click', () => {
            elements.hamburger.classList.toggle('active');
            elements.navMenu.classList.toggle('active');
        });
    }
    
    // 平滑滚动 - 使用事件委托
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target && elements.header) {
                const headerHeight = elements.header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 关闭移动菜单
                if (elements.hamburger && elements.navMenu) {
                    elements.hamburger.classList.remove('active');
                    elements.navMenu.classList.remove('active');
                }
            }
        }
    });
    
    // 滚动时头部背景变化 - 使用防抖
    const handleScroll = debounce(() => {
        if (elements.header) {
            if (window.scrollY > 100) {
                elements.header.style.background = 'rgba(255, 255, 255, 0.98)';
                elements.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                elements.header.style.background = 'rgba(255, 255, 255, 0.95)';
                elements.header.style.boxShadow = 'none';
            }
        }
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
    
    // 滚动动画 - 使用Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
    
    function initApp() {
        // 初始化DOM元素
        elements = {
            hamburger: document.querySelector('.hamburger'),
            navMenu: document.querySelector('.nav-menu'),
            header: document.querySelector('.header'),
            contactForm: document.querySelector('.contact-form'),
            contactFormDetailed: document.querySelector('.contact-form-detailed')
        };
        
        // 动画元素观察
        const animateElements = document.querySelectorAll('.case-card, .about-content, .contact-content');
        animateElements.forEach(el => {
            el.classList.add('scroll-animate');
            observer.observe(el);
        });
        
        // 表单处理
        if (elements.contactForm) {
            elements.contactForm.addEventListener('submit', handleFormSubmit);
        }
        
        // 详细表单处理
        if (elements.contactFormDetailed) {
            elements.contactFormDetailed.addEventListener('submit', handleDetailedFormSubmit);
        }
    }
    
    // 表单提交处理
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // 简单验证
        if (!name || !email || !message) {
            showNotification('必須項目を入力してください。', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('有効なメールアドレスを入力してください。', 'error');
            return;
        }
        
        // 提交处理
        showNotification('お問い合わせありがとうございます。後日ご連絡いたします。', 'success');
        this.reset();
    }
    
    // 详细表单提交处理
    function handleDetailedFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const inquiryType = formData.get('inquiry-type');
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const privacy = formData.get('privacy');
        
        // 验证
        if (!inquiryType || !name || !email || !message || !privacy) {
            showNotification('必須項目を入力してください。', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('有効なメールアドレスを入力してください。', 'error');
            return;
        }
        
        // 构建URL参数
        const params = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
            if (value) {
                params.append(key, value);
            }
        }
        
        // 跳转到确认页面
        window.location.href = 'contact-confirm.html?' + params.toString();
    }
    
    // 邮箱验证
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // 通知显示
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 样式
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db'
        });
        
        document.body.appendChild(notification);
        
        // 动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动移除
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
})(); 