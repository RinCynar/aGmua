/* Material You helper
 * - sets meta theme-color based on CSS variables
 * - exposes a small API to set accent color dynamically
 */

function ensureMeta() {
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }
  return meta;
}

function updateThemeColor() {
  const root = document.documentElement;
  const meta = ensureMeta();
  const style = getComputedStyle(root);
  const surface = style.getPropertyValue('--md-sys-surface').trim() || style.getPropertyValue('--md-sys-background').trim();
  if (surface) meta.setAttribute('content', surface);
}

function setAccentColor(hex) {
  if (!hex) return;
  document.documentElement.style.setProperty('--md-sys-primary', hex);
  updateThemeColor();
}

/* Extract a representative color from an <img> element.
 * Attempts to load via CORS-friendly Image for external images, falls back to using
 * the existing DOM image when allowed. Returns a hex string like '#rrggbb' or null.
 */
async function extractAccentFromImage(imgEl) {
  if (!imgEl) return null;
  const src = imgEl.currentSrc || imgEl.src;
  if (!src) return null;

  // Helper: convert rgb->hex
  function rgbToHex(r, g, b) {
    const toHex = (n) => ('0' + Math.round(n).toString(16)).slice(-2);
    return '#' + toHex(r) + toHex(g) + toHex(b);
  }

  // Try to draw image to canvas. Use a small canvas for performance.
  function sampleImage(image) {
    try {
      const canvas = document.createElement('canvas');
      const size = 32; // small sample
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;
      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i+3];
        if (alpha < 125) continue; // ignore transparent
        const rr = data[i], gg = data[i+1], bb = data[i+2];
        // skip near-white/near-black pixels to avoid background bias
        const luminance = (0.2126*rr + 0.7152*gg + 0.0722*bb);
        if (luminance > 240 || luminance < 10) continue;
        r += rr; g += gg; b += bb; count++;
      }
      if (count === 0) return null;
      return rgbToHex(r / count, g / count, b / count);
    } catch (e) {
      return null;
    }
  }

  // First try: create a new Image with crossOrigin to allow CORS-enabled remote images
  try {
    const testImg = new Image();
    testImg.crossOrigin = 'Anonymous';
    const p = new Promise((resolve, reject) => {
      testImg.onload = () => resolve(testImg);
      testImg.onerror = () => reject(new Error('cross-origin load failed'));
    });
    testImg.src = src;
    const loaded = await p.catch(() => null);
    if (loaded) {
      const c = sampleImage(loaded);
      if (c) return c;
    }
  } catch (e) {
    // ignore
  }

  // Fallback: if the DOM image is same-origin or already loaded and accessible, sample it
  try {
    if (imgEl.complete && imgEl.naturalWidth) {
      const c = sampleImage(imgEl);
      if (c) return c;
    }
  } catch (e) {
    // canvas tainted or other error
  }

  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  updateThemeColor();
  // Try to bind theme accent to avatar color if available
  const avatarImg = document.querySelector('#avatar-img') || document.querySelector('#avatar img');
  if (avatarImg) {
    // if image already loaded, try immediately; otherwise wait for load
    const applyFromImg = async () => {
      const hex = await extractAccentFromImage(avatarImg);
      if (hex) setAccentColor(hex);
    };
    if (avatarImg.complete) {
      applyFromImg();
    } else {
      avatarImg.addEventListener('load', applyFromImg);
    }
  }
  // watch for inline style changes to documentElement (e.g. accent changes)
  const obs = new MutationObserver(() => updateThemeColor());
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
  // expose API for other scripts
  window.MaterialYou = { setAccentColor };
});
