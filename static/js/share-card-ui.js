const ShareCardUI = (function () {
    function showPreview(canvas, filename) {
        const existing = document.getElementById('share-card-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'share-card-modal';
        modal.style.cssText = `
            position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 99999;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            padding: 24px; backdrop-filter: blur(10px); overflow: auto;
        `;

        const dataUrl = canvas.toDataURL('image/png');
        const isDark = document.documentElement.classList.contains('dark');
        const panelBg = isDark ? '#161b22' : '#ffffff';
        const subText = isDark ? 'rgba(230,237,243,0.5)' : '#656d76';

        modal.innerHTML = `
            <div style="background:${panelBg};border-radius:16px;padding:32px;max-width:94vw;
            max-height:92vh;display:flex;flex-direction:column;align-items:center;
            box-shadow:0 32px 64px -12px rgba(0,0,0,0.6);overflow:auto;">

                <img src="${dataUrl}" style="max-width:min(480px,78vw);border-radius:12px;
                box-shadow:0 12px 32px rgba(0,0,0,0.2);margin-bottom:28px;object-fit:contain;" />

                <div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-bottom:14px;">
                    <button id="sc-download" style="padding:12px 28px;background:#238636;color:#fff;
                    border:none;border-radius:10px;font-size:16px;cursor:pointer;font-weight:600;
                    transition:transform 0.15s,opacity 0.2s;">下载图片</button>
                    <button id="sc-copy" style="padding:12px 28px;background:#1f6feb;color:#fff;
                    border:none;border-radius:10px;font-size:16px;cursor:pointer;font-weight:600;
                    transition:transform 0.15s,opacity 0.2s;">复制到剪贴板</button>
                    <button id="sc-close" style="padding:12px 28px;background:#6e7681;color:#fff;
                    border:none;border-radius:10px;font-size:16px;cursor:pointer;
                    transition:transform 0.15s,opacity 0.2s;">关闭</button>
                </div>

                <p style="margin:0;font-size:13px;color:${subText};text-align:center;line-height:1.6;">
                    微信 / QQ / 钉钉可直接粘贴发送<br>
                    图片尺寸 ${canvas.width} × ${canvas.height} px · 高清 2× 输出
                </p>
            </div>
        `;

        document.body.appendChild(modal);

        // 下载
        modal.querySelector('#sc-download').onclick = () => {
            const a = document.createElement('a');
            a.download = filename;
            a.href = dataUrl;
            a.click();
        };

        // 复制到剪贴板
        modal.querySelector('#sc-copy').onclick = async () => {
            try {
                const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
                await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                const btn = modal.querySelector('#sc-copy');
                btn.textContent = '已复制';
                setTimeout(() => {
                    btn.textContent = '复制到剪贴板';
                }, 2000);
            } catch (e) {
                alert('复制失败，请使用下载按钮保存图片');
            }
        };

        // 关闭
        const close = () => modal.remove();
        modal.querySelector('#sc-close').onclick = close;
        modal.onclick = (e) => { if (e.target === modal) close(); };
        document.addEventListener('keydown', function esc(e) {
            if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
        });
    }

    return { showPreview };
})();
