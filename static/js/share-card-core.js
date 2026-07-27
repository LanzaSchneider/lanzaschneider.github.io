const ShareCardCore = (function () {
    const CONFIG = {
        cardWidth: 900,
        scale: 2,
    };

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
            const s = document.createElement('script');
            s.src = src; s.onload = resolve; s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    function generateQRCode(url, size) {
        return new Promise((resolve) => {
            const div = document.createElement('div');
            div.style.position = 'fixed';
            div.style.top = '-9999px';
            document.body.appendChild(div);

            new QRCode(div, {
                text: url,
                width: size,
                height: size,
                colorDark: '#1f2328',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.M,
            });

            let attempts = 0;
            const check = () => {
                const img = div.querySelector('img');
                const canvas = div.querySelector('canvas');
                let dataUrl = '';
                if (img && img.src && img.src.startsWith('data:')) {
                    dataUrl = img.src;
                } else if (canvas) {
                    dataUrl = canvas.toDataURL('image/png');
                }
                if (dataUrl) {
                    div.remove();
                    resolve(dataUrl);
                } else if (attempts++ < 30) {
                    setTimeout(check, 50);
                } else {
                    div.remove();
                    resolve('');
                }
            };
            setTimeout(check, 100);
        });
    }

    function escapeHtml(text) {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function extractContent() {
        const contentEl = document.querySelector('.post-content');
        if (!contentEl) return { html: '' };

        const clone = contentEl.cloneNode(true);

        // 移除不需要的元素（包括脚注区域）
        clone.querySelectorAll(
            'pre, code, table, figure, blockquote, .highlight, script, style, ' +
            'iframe, video, audio, svg, canvas, .footnotes, .share-card-trigger, ' +
            '#share-card-modal'
        ).forEach(el => el.remove());

        // 清理所有元素的 class/id/style，保留 sup/sub 标签本身
        clone.querySelectorAll('*').forEach(el => {
            el.removeAttribute('class');
            el.removeAttribute('id');
            if (el.tagName !== 'SUP' && el.tagName !== 'SUB') {
                el.removeAttribute('style');
            }
            if (el.tagName === 'A') {
                el.removeAttribute('href');
            }
        });

        // 给 sup/sub 加内联样式，让角标在卡片中正确显示为小字号上标
        clone.querySelectorAll('sup').forEach(el => {
            el.setAttribute('style', 'font-size:0.6em;vertical-align:super;line-height:0;');
        });
        clone.querySelectorAll('sub').forEach(el => {
            el.setAttribute('style', 'font-size:0.6em;vertical-align:sub;line-height:0;');
        });

        // 构建内容：只遍历直接子节点，避免 li 和内部 p 重复提取
        const parts = [];
        for (const child of Array.from(clone.childNodes)) {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent.trim();
                if (text) parts.push(`<p style="margin:0 0 18px 0;">${escapeHtml(text)}</p>`);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                const tag = child.tagName.toLowerCase();
                const inner = child.innerHTML;

                if (tag === 'p') {
                    parts.push(`<p style="margin:0 0 18px 0;">${inner}</p>`);
                } else if (tag.startsWith('h')) {
                    const level = parseInt(tag[1]) || 2;
                    const size = Math.max(26, 34 - (level - 1) * 3);
                    parts.push(`<p style="margin:28px 0 14px 0;font-size:${size}px;font-weight:700;line-height:1.4;">${inner}</p>`);
                } else if (tag === 'ul' || tag === 'ol') {
                    const items = Array.from(child.children)
                        .filter(li => li.tagName === 'LI')
                        .map(li => {
                            return `<p style="margin:0 0 10px 0;padding-left:28px;position:relative;">
                                <span style="position:absolute;left:6px;color:#0969da;font-weight:700;font-size:20px;line-height:1.4;">•</span>
                                ${li.innerHTML}
                            </p>`;
                        }).join('');
                    parts.push(items);
                } else if (tag === 'div') {
                    if (inner.trim()) {
                        parts.push(`<div style="margin:0 0 18px 0;">${inner}</div>`);
                    }
                } else if (tag !== 'br') {
                    parts.push(child.outerHTML);
                }
            }
        }

        return { html: parts.join('') };
    }

    function getArticleData() {
        const titleEl = document.querySelector('h1.post-title');
        const title = titleEl ? titleEl.innerText.trim() : document.title;

        const dateEl = document.querySelector('.post-meta');
        const date = dateEl ? dateEl.innerText.replace(/\n/g, ' ').trim() : '';

        const tags = Array.from(document.querySelectorAll('.post-tags a, .post-tags .tag'))
            .map(a => a.innerText.trim()).filter(t => t).slice(0, 5);

        const siteName = document.querySelector('meta[property="og:site_name"]')?.content
            || document.querySelector('header .logo')?.innerText?.trim()
            || window.location.hostname;

        const { html } = extractContent();

        return {
            title,
            date,
            tags,
            siteName,
            html,
            url: window.location.href
        };
    }

    async function createCard(data) {
        const isDark = document.documentElement.classList.contains('dark');
        const wrapper = document.createElement('div');
        wrapper.id = 'share-card-temp';
        wrapper.style.cssText = `position:fixed;top:-9999px;left:-9999px;z-index:-1;`;

        const bg = isDark
            ? 'linear-gradient(180deg, #0d1117 0%, #161b22 50%, #0d1117 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #f6f8fa 50%, #ffffff 100%)';
        const textColor = isDark ? '#e6edf3' : '#1f2328';
        const muted = isDark ? 'rgba(230,237,243,0.65)' : 'rgba(31,35,40,0.55)';
        const borderColor = isDark ? 'rgba(230,237,243,0.1)' : 'rgba(31,35,40,0.08)';
        const accent = isDark ? '#58a6ff' : '#0969da';
        const secondaryText = isDark ? 'rgba(230,237,243,0.5)' : 'rgba(31,35,40,0.45)';

        let qrHtml = '';
        try {
            await loadScript('https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js');
            const qrDataUrl = await generateQRCode(data.url, 160);
            if (qrDataUrl) {
                qrHtml = `<img src="${qrDataUrl}" style="width:130px;height:130px;border-radius:10px;background:#fff;padding:6px;box-shadow:0 2px 12px rgba(0,0,0,0.12);" />`;
            }
        } catch (e) { console.log('QR code skipped', e); }

        // 标签：用 inline-block + 固定 height + line-height 实现完美垂直居中，避免 flex 基线问题
        const tagsHtml = data.tags.length ? `
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;max-width:100%;overflow:hidden;">
                ${data.tags.map(t => `
                    <span style="display:inline-block;height:36px;line-height:18px;padding:0 16px;
                    border-radius:18px;background:${accent};color:#fff;font-size:18px;
                    font-weight:600;vertical-align:middle;max-width:220px;
                    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
                    flex-shrink:0;font-family:inherit;">${t}</span>
                `).join('')}
            </div>
        ` : '';

        const contentHtml = data.html || `<p style="margin:0 0 18px 0;font-size:23px;line-height:1.85;color:${muted};font-style:italic;">暂无正文内容</p>`;

        wrapper.innerHTML = `
            <div style="width:${CONFIG.cardWidth}px;background:${bg};padding:70px 75px 55px 75px;
            box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC',
            'Hiragino Sans GB','Microsoft YaHei','Noto Sans SC',sans-serif;position:relative;">

                <div style="position:absolute;top:0;left:0;right:0;height:6px;background:${accent};"></div>

                <div style="margin-bottom:10px;font-size:17px;color:${muted};font-weight:700;
                letter-spacing:2px;text-transform:uppercase;font-family:inherit;">${data.siteName}</div>

                ${tagsHtml}

                <h1 style="font-size:44px;font-weight:800;line-height:1.3;color:${textColor};
                margin:0 0 28px 0;word-break:break-word;font-family:inherit;">${data.title}</h1>

                <div style="width:60px;height:5px;background:${accent};border-radius:3px;margin-bottom:36px;"></div>

                <div style="margin-bottom:48px;font-size:23px;line-height:1.85;color:${textColor};
                font-family:inherit;word-break:break-word;">
                    ${contentHtml}
                </div>

                <div style="border-top:1px solid ${borderColor};padding-top:28px;
                display:flex;justify-content:space-between;align-items:flex-end;">
                    <div style="flex:1;min-width:0;">
                        <div style="font-size:16px;color:${muted};margin-bottom:6px;font-weight:600;">扫码阅读全文</div>
                        <div style="font-size:14px;color:${secondaryText};word-break:break-all;
                        line-height:1.5;font-family:monospace;">${data.url}</div>
                    </div>
                    <div style="flex-shrink:0;margin-left:24px;">
                        ${qrHtml}
                    </div>
                </div>

                <div style="margin-top:20px;font-size:15px;color:${secondaryText};text-align:right;
                font-family:inherit;">${data.date}</div>
            </div>
        `;

        document.body.appendChild(wrapper);
        return wrapper;
    }

    async function render(data) {
        await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
        const card = await createCard(data);

        await document.fonts.ready;
        await new Promise(r => setTimeout(r, 500));

        const target = card.querySelector('div');
        const canvas = await window.html2canvas(target, {
            scale: CONFIG.scale,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            logging: false,
            width: CONFIG.cardWidth,
            windowWidth: CONFIG.cardWidth,
        });

        card.remove();
        return canvas;
    }

    return { getArticleData, render, CONFIG };
})();