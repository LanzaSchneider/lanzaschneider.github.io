(function () {
    'use strict';

    async function generate() {
        const btn = document.getElementById('share-card-trigger');
        if (!btn) return;

        btn.disabled = true;
        btn.textContent = '正在生成…';
        btn.style.opacity = '0.7';

        try {
            const data = ShareCardCore.getArticleData();
            const canvas = await ShareCardCore.render(data);
            const filename = `share-${data.title.slice(0, 30).replace(/[^a-z0-9\u4e00-\u9fa5]/gi, '-')}.png`;
            ShareCardUI.showPreview(canvas, filename);
        } catch (err) {
            console.error('ShareCard Error:', err);
            alert('生成失败：' + err.message);
        } finally {
            btn.disabled = false;
            btn.textContent = '生成分享图';
            btn.style.opacity = '1';
        }
    }

    function init() {
        const content = document.querySelector('.post-content');
        if (!content || document.getElementById('share-card-trigger')) return;

        const btn = document.createElement('button');
        btn.id = 'share-card-trigger';
        btn.innerHTML = '生成分享图';
        btn.style.cssText = `
            display: inline-flex; align-items: center; gap: 8px;
            margin: 48px 0 24px 0; padding: 14px 32px; background: transparent;
            border: 2.5px solid var(--primary, #0969da); color: var(--primary, #0969da);
            border-radius: 12px; font-size: 16px; cursor: pointer; font-weight: 700;
            transition: all 0.25s ease; letter-spacing: 0.5px;
        `;
        btn.onmouseenter = () => {
            btn.style.background = 'var(--primary, #0969da)';
            btn.style.color = '#fff';
            btn.style.transform = 'translateY(-2px)';
            btn.style.boxShadow = '0 8px 20px rgba(9,105,218,0.25)';
        };
        btn.onmouseleave = () => {
            btn.style.background = 'transparent';
            btn.style.color = 'var(--primary, #0969da)';
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = 'none';
        };
        btn.onclick = generate;

        // 插入到正文之后
        content.insertAdjacentElement('afterend', btn);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
