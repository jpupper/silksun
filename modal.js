
// 多语言文本内容
const texts = {
    en: {
        title: "Artwork: Silk and Sun",
        description: "The work features the harmony between 2 nations. It is a call for joining forces and harmony to achieve global cooperation between two very different but prosperous nations: Argentina and China. The flowers are being drawn in a generative way that resembles silk. The artwork is fully generative and interactive.",
        interaction: "Interaction: Click on the canvas to draw silk flowers.",
        button: "Start Experience"
    },
    es: {
        title: "Obra: Seda y Sol",
        description: "La obra presenta la armonía entre 2 naciones. Es un llamado a unir fuerzas y armonía para lograr la cooperación global entre dos naciones muy diferentes pero prósperas: Argentina y China. Las flores se dibujan de manera generativa que se asemeja a la seda. La obra de arte es completamente generativa e interactiva.",
        interaction: "Interacción: Haz clic sobre el lienzo para dibujar las flores de seda.",
        button: "Comenzar Experiencia"
    },
    zh: {
        title: "艺术作品：丝与阳",
        description: "这件作品展现了两个国家之间的和谐。这是一个呼吁联合力量和谐共处，实现两个截然不同但繁荣的国家：阿根廷和中国之间的全球合作。花朵以生成式方式绘制，类似丝绸。这件艺术作品完全是生成式的，并且可交互。",
        interaction: "互动方式：点击画布绘制丝绸花朵。",
        button: "开始体验"
    }
};

// 初始化弹窗
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    const closeBtn = document.getElementById('close-popup');
    const langBtns = document.querySelectorAll('.lang-btn');
    
    // 默认显示中文
    setLanguage('zh');
    
    // 语言切换
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.id.split('-')[1];
            setLanguage(lang);
            
            // 更新活跃按钮样式
            langBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 设置语言
    function setLanguage(lang) {
        const content = texts[lang];
        popupText.innerHTML = `<h2>${content.title}</h2><p>${content.description}</p><p class="interaction-text">${content.interaction}</p>`;
        closeBtn.textContent = content.button;
    }
    
    // 关闭弹窗
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        // 设置全局变量，表示弹窗已关闭
        window.popupClosed = true;
    });
    
    // 默认选中中文按钮
    document.getElementById('lang-zh').classList.add('active');
    
    // 初始化弹窗状态
    window.popupClosed = false;
});