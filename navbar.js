(function () {
  var page = location.pathname.split('/').pop() || 'index.html';

  // Color activo por seccion
  var active = {
    'captacion.html': 'background:#1e3a5f;color:#60a5fa',
    'atencion.html':  'background:#1a3a2a;color:#4ade80',
    'retencion.html': 'background:#3a1a2a;color:#f472b6',
  };
  var defaultActive = 'background:#1e293b;color:#f1f5f9';

  function li(href, text) {
    var isActive = (href === page);
    var style = isActive ? ' style="' + (active[page] || defaultActive) + '"' : '';
    var cls   = isActive ? ' class="active"' : '';
    return '<li><a href="' + href + '"' + cls + style + '>' + text + '</a></li>';
  }

  var navHTML =
    '<a class="nav-logo" href="index.html">' +
      '<div class="pills"><span class="c">C</span><span class="a">A</span><span class="r">R</span></div>' +
      ' Sistema CAR' +
    '</a>' +
    '<button class="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>' +
    '<ul class="nav-links">' +
      li('modelo.html',         'Modelo') +
      li('icp.html',            'ICP') +
      li('oferta.html',         'Oferta') +
      li('validacion.html',     'Validación') +
      li('implementacion.html', 'Implementación') +
      '<li><span class="sep">|</span></li>' +
      li('captacion.html',  'C \u2014 Captación') +
      li('atencion.html',   'A \u2014 Atención') +
      li('retencion.html',  'R \u2014 Retención') +
    '</ul>';

  var nav = document.createElement('nav');
  nav.innerHTML = navHTML;

  var root = document.getElementById('nav-root');
  if (root) root.replaceWith(nav);

  var btn = nav.querySelector('.hamburger');
  var ul  = nav.querySelector('.nav-links');
  if (btn && ul) btn.addEventListener('click', function () { ul.classList.toggle('open'); });
})();
