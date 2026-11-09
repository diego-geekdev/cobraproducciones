// Cobra Producciones · prototipo v4
(function () {
  'use strict';

  // ---------- Menú móvil ----------
  var boton = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav-principal');
  if (boton && nav) {
    boton.addEventListener('click', function () {
      var abierto = nav.classList.toggle('abierto');
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      boton.textContent = abierto ? 'Cerrar' : 'Menú';
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('abierto');
        boton.setAttribute('aria-expanded', 'false');
        boton.textContent = 'Menú';
      });
    });
  }

  // ---------- Imágenes que aún no existen ----------
  // Logo: cae a texto. Fotos marcadas con data-pendiente: muestran el símbolo y "Foto pendiente".
  document.querySelectorAll('img').forEach(function (img) {
    function marcar() {
      if (img.dataset.alternativo) {
        var span = document.createElement('span');
        span.className = 'logo-texto';
        span.textContent = img.dataset.alternativo;
        img.replaceWith(span);
      } else if (img.hasAttribute('data-pendiente')) {
        img.parentElement.classList.add('foto-pendiente');
        img.remove();
      } else {
        img.classList.add('sin-imagen');
      }
    }
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) marcar();
    else img.addEventListener('error', marcar);
  });

  // ---------- Cuenta regresiva ----------
  function dosDigitos(n) { return n < 10 ? '0' + n : String(n); }
  document.querySelectorAll('[data-cuenta]').forEach(function (el) {
    var destino = new Date(el.dataset.cuenta).getTime();
    var d = el.querySelector('[data-d]'), h = el.querySelector('[data-h]'),
        m = el.querySelector('[data-m]'), s = el.querySelector('[data-s]');
    function pintar() {
      var falta = destino - Date.now();
      if (falta <= 0) {
        el.innerHTML = '<p class="cuenta-fin">La velada ya comenzó. Revisa resultados y fotos en la ficha del evento.</p>';
        clearInterval(t);
        return;
      }
      d.textContent = Math.floor(falta / 864e5);
      h.textContent = dosDigitos(Math.floor(falta / 36e5) % 24);
      m.textContent = dosDigitos(Math.floor(falta / 6e4) % 60);
      s.textContent = dosDigitos(Math.floor(falta / 1e3) % 60);
    }
    var t = setInterval(pintar, 1000);
    pintar();
  });
  document.querySelectorAll('[data-dias-a]').forEach(function (el) {
    var dias = Math.ceil((new Date(el.dataset.diasA).getTime() - Date.now()) / 864e5);
    el.textContent = dias > 0 ? dias : '0';
  });

  // ---------- Pestañas (eventos y clínicas) ----------
  document.querySelectorAll('[role="tablist"]').forEach(function (lista) {
    var tabs = Array.prototype.slice.call(lista.querySelectorAll('[role="tab"]'));
    function activar(tab, foco) {
      tabs.forEach(function (t) {
        var activo = t === tab;
        t.setAttribute('aria-selected', activo ? 'true' : 'false');
        t.tabIndex = activo ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !activo;
      });
      if (foco) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activar(tab); });
      tab.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') activar(tabs[(i + 1) % tabs.length], true);
        if (e.key === 'ArrowLeft') activar(tabs[(i - 1 + tabs.length) % tabs.length], true);
      });
    });
  });

  // ---------- Visor de galería ----------
  var visor = document.querySelector('.visor');
  if (visor) {
    var imgVisor = visor.querySelector('img'), contador = visor.querySelector('.contador');
    var fotos = [], actual = 0, origen = null;
    function mostrar(i) {
      actual = (i + fotos.length) % fotos.length;
      imgVisor.src = fotos[actual].src;
      imgVisor.alt = fotos[actual].alt;
      contador.textContent = (actual + 1) + ' de ' + fotos.length;
    }
    document.querySelectorAll('.galeria').forEach(function (gal) {
      gal.querySelectorAll('button').forEach(function (b, i) {
        b.addEventListener('click', function () {
          fotos = Array.prototype.map.call(gal.querySelectorAll('img'), function (im) { return { src: im.src, alt: im.alt }; });
          origen = b;
          mostrar(i);
          visor.classList.add('abierto');
          document.body.style.overflow = 'hidden';
          visor.querySelector('.cerrar').focus();
        });
      });
    });
    function cerrar() {
      visor.classList.remove('abierto');
      document.body.style.overflow = '';
      if (origen) origen.focus();
    }
    visor.querySelector('.cerrar').addEventListener('click', cerrar);
    visor.querySelector('.ant').addEventListener('click', function () { mostrar(actual - 1); });
    visor.querySelector('.sig').addEventListener('click', function () { mostrar(actual + 1); });
    visor.addEventListener('click', function (e) { if (e.target === visor) cerrar(); });
    document.addEventListener('keydown', function (e) {
      if (!visor.classList.contains('abierto')) return;
      if (e.key === 'Escape') cerrar();
      if (e.key === 'ArrowRight') mostrar(actual + 1);
      if (e.key === 'ArrowLeft') mostrar(actual - 1);
    });
  }

  // ---------- Formularios (demostración): contacto y solicitud de clínica ----------
  document.querySelectorAll('form.formulario').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valido = true;
      form.querySelectorAll('[required]').forEach(function (c) {
        var campo = c.closest('.campo');
        var ok = c.value.trim() !== '' && (c.type !== 'email' || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(c.value));
        campo.classList.toggle('invalido', !ok);
        if (!ok && valido) { c.focus(); valido = false; }
      });
      if (!valido) return;
      form.querySelector('.form-ok').classList.add('visible');
      form.reset();
    });
    form.querySelectorAll('input, select, textarea').forEach(function (c) {
      c.addEventListener('input', function () { var campo = c.closest('.campo'); if (campo) campo.classList.remove('invalido'); });
    });
  });
})();

// ======================================================================
// v4 · Movimiento e interacciones
// ======================================================================
(function () {
  'use strict';
  var quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raiz = document.documentElement;

  // ---------- Carrusel de sponsors: botón Pausar / Reanudar ----------
  document.querySelectorAll('[data-carrusel]').forEach(function (c) {
    var b = c.querySelector('[data-carrusel-pausa]');
    if (!b) return;
    b.addEventListener('click', function () {
      var pausado = c.classList.toggle('pausado');
      b.setAttribute('aria-pressed', pausado ? 'true' : 'false');
      b.textContent = pausado ? 'Reanudar' : 'Pausar';
    });
  });

  // ---------- Barra de progreso y botón volver arriba ----------
  var barra = document.createElement('div');
  barra.className = 'progreso';
  barra.setAttribute('aria-hidden', 'true');
  document.body.appendChild(barra);

  var arriba = document.createElement('button');
  arriba.type = 'button';
  arriba.className = 'arriba';
  arriba.setAttribute('aria-label', 'Volver arriba');
  arriba.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5l-7 7 1.4 1.4L11 8.8V20h2V8.8l4.6 4.6L19 12z" fill="currentColor"/></svg>';
  arriba.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: quieto ? 'auto' : 'smooth' });
    var destino = document.querySelector('.logo');
    if (destino) destino.focus({ preventScroll: true });
  });
  document.body.appendChild(arriba);

  var cabecera = document.querySelector('.cabecera');
  var heroFoto = document.querySelector('.hero-foto');
  var pendiente = false;

  function alDesplazar() {
    pendiente = false;
    var y = window.scrollY;
    var alto = document.documentElement.scrollHeight - window.innerHeight;
    barra.style.transform = 'scaleX(' + (alto > 0 ? Math.min(y / alto, 1) : 0) + ')';
    if (cabecera) cabecera.classList.toggle('compacta', y > 80);
    arriba.classList.toggle('visible', y > window.innerHeight * 0.9);
    // Paralaje suave de la foto del hero (solo mientras se ve)
    if (heroFoto && !quieto && y < window.innerHeight) heroFoto.style.transform = 'translateY(' + (y * 0.25) + 'px)';
  }
  window.addEventListener('scroll', function () {
    if (!pendiente) { pendiente = true; window.requestAnimationFrame(alDesplazar); }
  }, { passive: true });
  alDesplazar();

  // ---------- Aparición de contenidos al hacer scroll ----------
  if (quieto || !('IntersectionObserver' in window)) return;
  raiz.classList.add('con-movimiento');

  var grupos = [
    '.seccion-cabeza', '.destacado > *', '.cita-marca', '.intro-cobra',
    '.grilla-eventos > *', '.valores > *', '.grilla-boxeadores > *', '.grilla-noticias > *',
    '.beneficios > *', '.clinicas-grid > *', '.bloque-dividido > *', '.combate',
    '.galeria > *', '.carrusel-bloque', '.contacto-grid > *', '.subtitulo', '.caja'
  ];
  var elementos = document.querySelectorAll(grupos.join(','));
  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('visto');
      observador.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  elementos.forEach(function (el) {
    if (el.closest('.hero')) return;
    // Los hermanos de una misma grilla aparecen escalonados
    var hermanos = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
    el.style.setProperty('--retardo', Math.min(hermanos, 5) * 0.08 + 's');
    el.classList.add('revela');
    observador.observe(el);
  });
})();
