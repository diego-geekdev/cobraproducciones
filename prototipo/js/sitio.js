// Menú móvil
(function () {
  var boton = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav-principal');
  if (boton && nav) {
    boton.addEventListener('click', function () {
      var abierto = nav.classList.toggle('abierto');
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      boton.textContent = abierto ? 'Cerrar' : 'Menú';
    });
  }

  // Si una imagen aún no está en /img, se oculta en vez de mostrar el ícono roto.
  // El logo cae a texto plano solo para poder revisar el prototipo sin archivos.
  document.querySelectorAll('img').forEach(function (img) {
    function marcar() {
      if (img.dataset.alternativo) {
        var span = document.createElement('span');
        span.className = 'logo-texto';
        span.textContent = img.dataset.alternativo;
        img.replaceWith(span);
      } else {
        img.classList.add('sin-imagen');
      }
    }
    if (img.complete && img.naturalWidth === 0) marcar();
    else img.addEventListener('error', marcar);
  });
})();
