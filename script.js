// DOM要素の取得
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');
const contactForm = document.querySelector('.contact-form');

// ハンバーガーメニューの切り替え
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ナビゲーションリンクのスムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // モバイルメニューを閉じる
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// スクロール時のヘッダー背景変更
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// スクロールアニメーション
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

// アニメーション対象要素の監視
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .case-card, .about-content, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
});

// フォーム送信処理
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const message = formData.get('message');
        
        // 簡単なバリデーション
        if (!name || !email || !message) {
            showNotification('必須項目を入力してください。', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('有効なメールアドレスを入力してください。', 'error');
            return;
        }
        
        // 送信処理（実際の実装ではサーバーに送信）
        // 内部処理用メールアドレス: Ito.Takuya@meka-tech.com
        showNotification('お問い合わせありがとうございます。後日ご連絡いたします。', 'success');
        this.reset();
    });
}

// メールアドレスのバリデーション
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 通知表示機能
function showNotification(message, type = 'info') {
    // 既存の通知を削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 新しい通知を作成
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // スタイルを追加
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // アニメーション表示
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 閉じるボタンのイベント
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // 自動で閉じる
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// 統計数字のカウントアップアニメーション
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const duration = 2000; // 2秒
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : 
                                                    stat.textContent.includes('%') ? '%' : 
                                                    stat.textContent.includes('年') ? '年' : '');
        }, 16);
    });
}

// 統計セクションが表示されたときにアニメーション開始
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// 統計セクションの監視開始
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// パフォーマンス最適化：画像の遅延読み込み
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ページ読み込み完了時の処理
window.addEventListener('load', () => {
    // ローディングアニメーションの終了
    document.body.classList.add('loaded');
    
    // パフォーマンス計測
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`ページ読み込み時間: ${loadTime}ms`);
    }
});

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('JavaScriptエラー:', e.error);
});

// 未処理のPromise拒否のハンドリング
window.addEventListener('unhandledrejection', (e) => {
    console.error('未処理のPromise拒否:', e.reason);
});

// タブ切り替え機能
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // アクティブクラスを削除
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // 新しいタブをアクティブに
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// FAQアコーディオン機能
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // 他のアイテムを閉じる
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // クリックされたアイテムを開く/閉じる
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// フローティング要素の高速ランダム移動とスクロール連動効果
document.addEventListener('DOMContentLoaded', () => {
    const floatingElements = document.querySelectorAll('.floating-element');
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && floatingElements.length > 0) {
        let mouseX = 0;
        let mouseY = 0;
        let scrollY = 0;
        let time = 0;
        
        // 各要素のランダムパラメータ
        const elementParams = floatingElements.map((_, index) => ({
            baseX: parseFloat(getComputedStyle(_).left) || 0,
            baseY: parseFloat(getComputedStyle(_).top) || 0,
            speedX: (Math.random() - 0.5) * 2 + 1,
            speedY: (Math.random() - 0.5) * 2 + 1,
            amplitudeX: 30 + Math.random() * 40,
            amplitudeY: 30 + Math.random() * 40,
            phase: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            scaleSpeed: (Math.random() - 0.5) * 0.01
        }));
        
        // マウス位置の追跡
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // スクロール位置の追跡
        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;
        });
        
        // フローティング要素の動的更新
        function updateFloatingElements() {
            time += 0.016; // 約60fps
            
            floatingElements.forEach((element, index) => {
                const params = elementParams[index];
                const rect = element.getBoundingClientRect();
                
                // ランダム移動計算
                const randomX = Math.sin(time * params.speedX + params.phase) * params.amplitudeX;
                const randomY = Math.cos(time * params.speedY + params.phase) * params.amplitudeY;
                
                // スクロール連動効果（より高速）
                const scrollEffectX = Math.sin(scrollY * 0.01 + params.phase) * 20;
                const scrollEffectY = Math.cos(scrollY * 0.015 + params.phase) * 15;
                
                // マウス追従効果
                const elementCenterX = rect.left + rect.width / 2;
                const elementCenterY = rect.top + rect.height / 2;
                const distanceX = mouseX - elementCenterX;
                const distanceY = mouseY - elementCenterY;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                const maxDistance = 200;
                
                let mouseEffectX = 0;
                let mouseEffectY = 0;
                
                if (distance < maxDistance) {
                    const intensity = (maxDistance - distance) / maxDistance;
                    mouseEffectX = (distanceX / distance) * intensity * 15;
                    mouseEffectY = (distanceY / distance) * intensity * 15;
                }
                
                // 回転とスケール効果
                const rotation = Math.sin(time * params.rotationSpeed) * 10;
                const scale = 1 + Math.sin(time * params.scaleSpeed) * 0.1;
                
                // 最終的な位置と変形
                const finalX = randomX + scrollEffectX + mouseEffectX;
                const finalY = randomY + scrollEffectY + mouseEffectY;
                
                element.style.transform = `translate(${finalX}px, ${finalY}px) rotate(${rotation}deg) scale(${scale})`;
            });
            
            requestAnimationFrame(updateFloatingElements);
        }
        
        updateFloatingElements();
    }
});

// ロゴのホバー効果
document.addEventListener('DOMContentLoaded', () => {
    const logoIcon = document.querySelector('.logo-icon');
    
    if (logoIcon) {
        logoIcon.addEventListener('mouseenter', () => {
            logoIcon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        logoIcon.addEventListener('mouseleave', () => {
            logoIcon.style.transform = 'scale(1) rotate(0deg)';
        });
    }
}); 