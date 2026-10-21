# Cobra Producciones · Sitio web

| Carpeta        | Se despliega en                                         |
|----------------|---------------------------------------------------------|
| `prototipo/`   | prototipo.cobraproducciones.cl                           |
| `cobra-core/`  | public_html/wp-content/plugins/cobra-core               |
| `cobra-theme/` | public_html/wp-content/themes/cobra                     |

## Deploy
1. `git push` a `main`.
2. cPanel → Git Version Control → Administrar → Pull o Deploy.
3. **Actualizar desde remoto** y luego **Desplegar commit HEAD**.

El archivo `.cpanel.yml` decide qué se copia y dónde. Solo despliega si el
repositorio del servidor no tiene cambios sin confirmar.
