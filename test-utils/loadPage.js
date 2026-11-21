// Loads index.html and its scripts into the jsdom document the same way a
// browser does: each file runs as its own classic <script>, in page order,
// sharing one global scope.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const loadPage = () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]);
  document.documentElement.innerHTML = html.replace(/<script[\s\S]*?<\/script>/g, '');

  const errors = [];
  const onError = (event) => {
    errors.push(event.error || event.message);
    event.preventDefault();
  };
  window.addEventListener('error', onError);
  for (const src of scripts) {
    const script = document.createElement('script');
    script.textContent = fs.readFileSync(path.join(root, src), 'utf8');
    script.dataset.src = src;
    document.body.appendChild(script);
  }
  window.removeEventListener('error', onError);
  return errors;
};

// Top-level const declarations in classic scripts aren't properties of
// window, so read them from inside the page's global scope.
const pageGlobals = (...names) => {
  const script = document.createElement('script');
  script.textContent = `window.__pageGlobals = { ${names.join(', ')} };`;
  document.body.appendChild(script);
  const globals = window.__pageGlobals;
  delete window.__pageGlobals;
  return globals;
};

module.exports = { loadPage, pageGlobals };
