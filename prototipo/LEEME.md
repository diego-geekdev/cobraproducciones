# Prototipo Cobra Producciones (H2)

Prototipo estático en HTML/CSS para que Cristián revise diseño y estructura.
Tres páginas: `index.html` (inicio), `evento.html` (ficha de evento) y `boxeador.html` (ficha de boxeador).

## 1. Copiar las imágenes a /img

Las fotos están en el Drive, carpeta CONTENIDO CLIENTE. Copia cada archivo con el nombre de la izquierda:

| Nombre en /img           | Archivo en el Drive                                         |
|--------------------------|-------------------------------------------------------------|
| logo-negativo.png        | LOGO PNG / Logo_COBRA_Negativo.png                          |
| simbolo-rojo.png         | LOGO PNG / Símbolo_rojo.png (favicon)                       |
| hero.jpg                 | Fotos Velada 1 / Velada-119.jpg (o la mejor foto horizontal)|
| afiche-super4.png        | Afiches / PNG AFICHE(1).png                                 |
| afiche-final-super4.png  | Afiches / Diseño Super 4 + Homenaje M. Vargas(1).png        |
| afiche-4f-final.png      | Afiches / Los 4 FANTASTICOS FINAL (10)(1).png               |
| afiche-4f.png            | Afiches / Los 4 FANTASTICOS(1).png                          |
| boxeador-1.jpg           | Foto de J. L. Acevedo (Super 4: 1_8_MSI6072.jpg u otra)     |
| boxeador-2.jpg           | Foto de A. Arcoverde                                        |
| cristian.jpg             | Foto de Cristián (no viene en el Drive: pedírsela)          |
| galeria-1.jpg a galeria-6.jpg | Velada-104, Velada-107, Velada-115, Velada-120 (Velada 1) y 14.jpg, 17.jpg (Velada 2) |

Mientras falte una imagen, el prototipo muestra un recuadro gris en su lugar.

**Peso:** los afiches pesan entre 5 y 8 MB y las fotos de Velada 1 entre 1 y 3 MB.
Antes de subirlos, redúcelos a 1600 px de ancho y calidad 80 (por ejemplo con squoosh.app).
El prototipo se verá en celulares y así carga rápido.

## 2. Publicar en prototipo.cobraproducciones.cl

1. Sube todo el contenido de esta carpeta a la raíz del subdominio.
2. cPanel → Privacidad de directorios → protege la carpeta con usuario y clave.
3. Abre el `.htaccess` de la carpeta: cPanel habrá escrito sus líneas al inicio;
   las de este paquete deben quedar debajo.
4. Prueba en incógnito: debe pedir clave, redirigir a https y responder con `X-Robots-Tag: noindex`.

## 3. Qué es de ejemplo

- El "Próximo evento" usa los datos de Super 4 (7 jun 2025) solo para mostrar el diseño.
- Récords, categorías e historial de combates están marcados como "por confirmar" o "de ejemplo".
- Los sponsors aparecen como texto; en el sitio final van sus logos.
