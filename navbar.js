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
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      height: 44px;
      display: flex; align-items: center;
      padding: 0 16px;
    }
    .nav-container {
      max-width: 1600px; margin: 0 auto; width: 100%;
      display: flex; align-items: stretch; justify-content: space-between; gap: 12px;
      height: 100%;
    }
    .nav-logo {
      font-family: 'Outfit', sans-serif;
      font-size: 13px; font-weight: 800; color: #fff;
      text-decoration: none; display: flex; align-items: center; gap: 7px;
      letter-spacing: 0.5px; white-space: nowrap; flex-shrink: 0;
    }
    .nav-logo .pills { display: flex; gap: 3px; }
    .nav-logo span { padding: 2px 5px; border-radius: 3px; font-size: 10px; font-weight: 900; }
    .nav-logo .c { background: #1e3a5f; color: #93c5fd; }
    .nav-logo .a { background: #1a3a2a; color: #6ee7b7; }
    .nav-logo .r { background: #3a1a2a; color: #f9a8d4; }

    .nav-links {
      display: flex; gap: 2px; list-style: none; margin: 0; padding: 0;
      flex-wrap: nowrap; align-items: center;
    }
    .nav-links > li {
      display: flex; align-items: stretch; height: 100%;
      position: relative;
    }
    .nav-links > li > a {
      display: flex; align-items: center;
      color: #94a3b8; text-decoration: none; font-size: 11.5px; font-weight: 600;
      padding: 0 9px; border-radius: 6px; transition: all 0.15s; white-space: nowrap;
    }
    .nav-links > li > a:hover { color: #fff; background: rgba(255,255,255,0.08); }
    .nav-links > li > a.active { color: #fff; background: rgba(255,255,255,0.12); }
    .nav-links a.highlight { color: #34d399; }
    .nav-links a.highlight:hover { background: rgba(52,211,153,0.1); }
    .nav-links a.highlight.active { background: rgba(52,211,153,0.15); }

    /* ── Dropdown — no gap trick ── */
    /* The <li> stretches full nav height (44px).
       sub-menu uses top:100% = starts right at nav bottom — no dead zone. */
    .has-dropdown > a::after {
      content: ' ▾'; font-size: 8px; opacity: 0.6; margin-left: 1px;
    }
    .sub-menu {
      display: none; position: absolute;
      top: 100%; left: 0;           /* flush with bottom of nav — zero gap */
      background: #0d1829;
      border: 1px solid rgba(255,255,255,0.14);
      border-top: none;             /* seamless join with nav border */
      border-radius: 0 0 12px 12px;
      padding: 6px 6px 8px;
      min-width: 190px; flex-direction: column; gap: 1px;
      z-index: 200;
      box-shadow: 0 16px 40px rgba(0,0,0,0.6);
    }
    .has-dropdown:hover .sub-menu { display: flex; }
    .sub-menu li { list-style: none; }
    .sub-menu a {
      color: #94a3b8; text-decoration: none; font-size: 11px; font-weight: 600;
      padding: 6px 11px; border-radius: 7px; transition: all 0.15s;
      display: block; white-space: nowrap;
    }
    .sub-menu a:hover { color: #fff; background: rgba(255,255,255,0.08); }
    .sub-menu a.active { color: #fff; background: rgba(255,255,255,0.1); }
    .sub-menu a.highlight { color: #34d399; font-weight: 700; }
    .sub-menu a.highlight:hover { background: rgba(52,211,153,0.1); }
    .sub-menu .sub-divider {
      height: 1px; background: rgba(255,255,255,0.07);
      margin: 4px 6px;
    }
    .sub-menu .sub-label {
      font-size: 9px; font-weight: 800; text-transform: uppercase;
      letter-spacing: 0.1em; color: #475569; padding: 6px 11px 2px;
    }

    .hamburger { display: none; background: none; border: none; cursor: pointer; color: #fff; flex-shrink: 0; align-self: center; }

    @media (max-width: 1100px) {
      .nav-container { align-items: center; }
      .nav-links {
        display: none; position: absolute; top: 44px; left: 0; right: 0;
        background: #0f172a; flex-direction: column; padding: 12px; align-items: stretch;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }
      .nav-links.open { display: flex; }
      .nav-links > li { height: auto; align-items: stretch; }
      .nav-links > li > a { padding: 8px 10px; }
      .hamburger { display: block; }

      .has-dropdown > a::after { content: ' ▸'; }
      .has-dropdown.open > a::after { content: ' ▾'; }
      .sub-menu {
        position: static; display: none !important;
        border: none; border-left: 2px solid rgba(255,255,255,0.1);
        border-radius: 0; background: transparent;
        box-shadow: none; padding: 4px 0 4px 8px; margin: 2px 0 4px 8px;
        min-width: unset;
      }
      .has-dropdown.open .sub-menu { display: flex !important; }
      .sub-menu .sub-label { padding: 4px 8px; }
      .sub-menu .sub-divider { margin: 3px 4px; }
    }
    body { padding-top: 44px; }
  `;
  document.head.appendChild(navStyles);

  /* ── Build Nav ── */
  var page = location.pathname.split('/').pop() || 'index.html';

  var links = [
    { href: 'index.html', text: 'Inicio' },
    { href: 'estrategia.html', text: 'Estrategia' },
    { href: 'nichos.html', text: 'Nichos', children: [
      { href: 'cosmetica.html', text: '✦ Skincare', cls: 'highlight' },
      { type: 'divider' },
      { type: 'label', text: 'Secciones' },
      { href: 'cosmetica.html#oferta',      text: 'La Oferta' },
      { href: 'cosmetica.html#pricing',     text: 'Precios' },
      { href: 'cosmetica.html#portal',      text: 'Portal del Cliente' },
      { href: 'cosmetica.html#prospeccion', text: 'Prospección' },
      { href: 'cosmetica.html#objeciones',  text: 'Objeciones' },
      { href: 'cosmetica.html#formatos',    text: 'Formatos Creativos' },
      { href: 'cosmetica.html#angulos',     text: 'Ángulos' },
      { href: 'cosmetica.html#hooks',       text: 'Hooks' },
      { href: 'cosmetica.html#audiencias',  text: 'Audiencias' }
    ]},
    { href: 'oferta.html', text: 'Oferta' },
    { href: 'ventas.html', text: 'Ventas' },
    { href: 'operacion.html', text: 'Operación' },
    { href: 'captacion.html', text: 'Captación (interno)' },
    { href: 'atencion.html', text: 'Atención (interno)' },
    { href: 'retencion.html', text: 'Retención (interno)' }
  ];

  function buildChild(c) {
    if (c.type === 'divider') return '<li><div class="sub-divider"></div></li>';
    if (c.type === 'label')   return '<li><div class="sub-label">' + c.text + '</div></li>';
    var base = c.href.split('#')[0];
    var cc = [];
    if (base === page) cc.push('active');
    if (c.cls) cc.push(c.cls);
    var ccls = cc.length ? ' class="' + cc.join(' ') + '"' : '';
    return '<li><a href="' + c.href + '"' + ccls + '>' + c.text + '</a></li>';
  }

  var linksHTML = links.map(function(l) {
    var isActive = (l.href === page);
    var childActive = l.children && l.children.some(function(c) {
      return c.href && c.href.split('#')[0] === page;
    });
    var classes = [];
    if (isActive || childActive) classes.push('active');
    if (l.cls) classes.push(l.cls);
    if (l.children) classes.push('has-dropdown');
    var cls = classes.length ? ' class="' + classes.join(' ') + '"' : '';

    var html = '<li' + cls + '>';
    html += '<a href="' + l.href + '">' + l.text + '</a>';
    if (l.children) {
      html += '<ul class="sub-menu">';
      html += l.children.map(buildChild).join('');
      html += '</ul>';
    }
    html += '</li>';
    return html;
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
  if (root) { root.replaceWith(nav); } else { document.body.prepend(nav); }

  /* ── Hamburger ── */
  var btn = nav.querySelector('.hamburger');
  var ul  = nav.querySelector('.nav-links');
  if (btn && ul) { btn.onclick = function() { ul.classList.toggle('open'); }; }

  /* ── Mobile dropdown toggle ── */
  nav.querySelectorAll('.has-dropdown > a').forEach(function(a) {
    a.addEventListener('click', function(e) {
      if (window.innerWidth <= 1100) {
        e.preventDefault();
        a.parentElement.classList.toggle('open');
      }
    });
  });
})();
