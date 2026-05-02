(function () {
  /* ── Inject canonical nav CSS (overrides any per-page variation) ── */
  var css = document.createElement('style');
  css.textContent = [
    'nav{position:sticky;top:0;z-index:100;background:rgba(10,15,26,0.95);backdrop-filter:blur(12px);',
    '-webkit-backdrop-filter:blur(12px);border-bottom:1px solid #1e293b;padding:0 24px;display:flex;',
    'align-items:center;justify-content:space-between;height:52px;gap:16px;}',

    '.nav-logo{font-size:15px;font-weight:800;letter-spacing:2px;color:#f8fafc;display:flex;',
    'align-items:center;gap:8px;text-decoration:none;flex-shrink:0;}',

    '.nav-logo .pills{display:flex;gap:3px;}',
    '.nav-logo .c{background:#1e3a5f;color:#60a5fa;padding:2px 7px;border-radius:4px;font-size:11px;font-weight:700;}',
    '.nav-logo .a{background:#1a3a2a;color:#4ade80;padding:2px 7px;border-radius:4px;font-size:11px;font-weight:700;}',
    '.nav-logo .r{background:#3a1a2a;color:#f472b6;padding:2px 7px;border-radius:4px;font-size:11px;font-weight:700;}',

    '.nav-links{display:flex;gap:2px;list-style:none;margin:0;padding:0;flex-wrap:wrap;}',
    '.nav-links a{display:block;padding:5px 10px;font-size:12px;font-weight:500;color:#94a3b8;',
    'text-decoration:none;border-radius:6px;transition:background 0.15s,color 0.15s;white-space:nowrap;}',
    '.nav-links a:hover{background:#1e293b;color:#f1f5f9;}',
    '.nav-links a.active{background:#1e293b;color:#f1f5f9;}',
    '.nav-links .sep{color:#334155;font-size:12px;padding:5px 2px;display:flex;align-items:center;}',

    '.hamburger{display:none;background:none;border:none;cursor:pointer;padding:6px;',
    'flex-direction:column;gap:5px;flex-shrink:0;}',
    '.hamburger span{display:block;width:22px;height:2px;background:#94a3b8;border-radius:2px;transition:0.2s;}',

    '@media(max-width:768px){',
    'nav{padding:0 16px;flex-wrap:wrap;height:auto;min-height:52px;}',
    '.hamburger{display:flex;}',
    '.nav-links{display:none;width:100%;flex-direction:column;gap:0;padding:8px 0 12px;',
    'border-top:1px solid #1e293b;margin-top:4px;}',
    '.nav-links.open{display:flex;}',
    '.nav-links a{padding:8px 12px;font-size:13px;white-space:normal;}',
    '.nav-links .sep{display:none;}',
    '}'
  ].join('');
  document.head.appendChild(css);

  /* ── Build nav ── */
  var page = location.pathname.split('/').pop() || 'index.html';

  var activeStyle = {
    'captacion.html': 'background:#1e3a5f;color:#60a5fa',
    'atencion.html':  'background:#1a3a2a;color:#4ade80',
    'retencion.html': 'background:#3a1a2a;color:#f472b6',
  };
  var defaultActive = 'background:#1e293b;color:#f1f5f9';

  function li(href, text) {
    var isActive = (href === page);
    var style = isActive ? ' style="' + (activeStyle[page] || defaultActive) + '"' : '';
    var cls   = isActive ? ' class="active"' : '';
    return '<li><a href="' + href + '"' + cls + style + '>' + text + '</a></li>';
  }

  var navHTML =
    '<a class="nav-logo" href="index.html">' +
      '<div class="pills"><span class="c">C</span><span class="a">A</span><span class="r">R</span></div>' +
      ' Sistema CAR' +
    '</a>' +
    '<button class="hamburger" aria-label="Men\u00fa"><span></span><span></span><span></span></button>' +
    '<ul class="nav-links">' +
      li('modelo.html',     'Modelo') +
      li('icp.html',        'ICP') +
      li('oferta.html',     'Oferta') +
      li('precios.html',    'Precios') +
      li('costos.html',     'Costos') +
      li('validacion.html', 'Validaci\u00f3n') +
      li('sops.html',       'SOPs') +
      li('guiones.html',    'Guiones') +
      '<li><span class="sep">|</span></li>' +
      li('captacion.html',  'C \u2014 Captaci\u00f3n') +
      li('atencion.html',   'A \u2014 Atenci\u00f3n') +
      li('retencion.html',  'R \u2014 Retenci\u00f3n') +
    '</ul>';

  var nav = document.createElement('nav');
  nav.innerHTML = navHTML;

  var root = document.getElementById('nav-root');
  if (root) root.replaceWith(nav);

  var btn = nav.querySelector('.hamburger');
  var ul  = nav.querySelector('.nav-links');
  if (btn && ul) btn.addEventListener('click', function () { ul.classList.toggle('open'); });
})();
