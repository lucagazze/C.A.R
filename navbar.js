(function () {
  /* ── Inject Nav CSS ── */
  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'style.css';
  document.head.appendChild(css);

  var navStyles = document.createElement('style');
  navStyles.textContent = `
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      background: rgba(15, 23, 42, 0.9);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
      height: 64px;
      display: flex; align-items: center;
      padding: 0 24px;
    }
    .nav-container {
      max-width: 1200px; margin: 0 auto; width: 100%;
      display: flex; align-items: center; justify-content: space-between;
    }
    .nav-logo {
      font-family: 'Outfit', sans-serif;
      font-size: 18px; font-weight: 800; color: #fff;
      text-decoration: none; display: flex; align-items: center; gap: 10px;
      letter-spacing: 1px;
    }
    .nav-logo .pills { display: flex; gap: 4px; }
    .nav-logo span { padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: 900; }
    .nav-logo .c { background: #1e3a5f; color: #93c5fd; }
    .nav-logo .a { background: #1a3a2a; color: #6ee7b7; }
    .nav-logo .r { background: #3a1a2a; color: #f9a8d4; }
    
    .nav-links { display: flex; gap: 8px; list-style: none; margin: 0; padding: 0; }
    .nav-links a {
      color: #cbd5e1; text-decoration: none; font-size: 13px; font-weight: 600;
      padding: 8px 12px; border-radius: 8px; transition: all 0.2s;
    }
    .nav-links a:hover { color: #fff; background: rgba(255, 255, 255, 0.1); }
    .nav-links a.active { color: #fff; background: rgba(255, 255, 255, 0.15); }
    
    .hamburger { display: none; background: none; border: none; cursor: pointer; color: #fff; }
    
    @media (max-width: 1024px) {
      .nav-links { display: none; position: absolute; top: 64px; left: 0; right: 0; 
                   background: #0f172a; flex-direction: column; padding: 20px; 
                   border-bottom: 1px solid rgba(255, 255, 255, 0.15); }
      .nav-links.open { display: flex; }
      .hamburger { display: block; }
    }
    body { padding-top: 64px; }
  `;
  document.head.appendChild(navStyles);

  /* ── Build Nav ── */
  var page = location.pathname.split('/').pop() || 'index.html';
  
  var links = [
    { href: 'index.html', text: 'Inicio' },
    { href: 'estrategia.html', text: 'Estrategia' },
    { href: 'oferta.html', text: 'Oferta' },
    { href: 'ventas.html', text: 'Ventas' },
    { href: 'operacion.html', text: 'Operación' },
    { href: 'captacion.html', text: 'Captación (interno)' },
    { href: 'atencion.html', text: 'Atención (interno)' },
    { href: 'retencion.html', text: 'Retención (interno)' }
  ];

  var linksHTML = links.map(function(l) {
    var active = (l.href === page) ? ' class="active"' : '';
    return '<li><a href="' + l.href + '"' + active + '>' + l.text + '</a></li>';
  }).join('');

  var navHTML = `
    <div class="nav-container">
      <a class="nav-logo" href="index.html">
        <div class="pills"><span class="c">C</span><span class="a">A</span><span class="r">R</span></div>
        C.A.R SYSTEM
      </a>
      <button class="hamburger" aria-label="Menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
      </button>
      <ul class="nav-links">${linksHTML}</ul>
    </div>
  `;

  var nav = document.createElement('nav');
  nav.innerHTML = navHTML;
  
  var root = document.getElementById('nav-root');
  if (root) {
    root.replaceWith(nav);
  } else {
    document.body.prepend(nav);
  }

  var btn = nav.querySelector('.hamburger');
  var ul = nav.querySelector('.nav-links');
  if (btn && ul) {
    btn.onclick = function() { ul.classList.toggle('open'); };
  }
})();
