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

document.addEventListener('DOMContentLoaded', () => {
  updateThemeColor();
  // watch for inline style changes to documentElement (e.g. accent changes)
  const obs = new MutationObserver(() => updateThemeColor());
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
  // expose API for other scripts
  window.MaterialYou = { setAccentColor };
});
