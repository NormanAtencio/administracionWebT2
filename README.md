Para configurar el workflow elegí la tarea de publicar la página en GitHub Pages. Lo pasos a seguir fueron los siguientes:
1. Se creó el repositorio.
2. Se subieron las fuentes al repositorio creado.
3. Una vez se encontraban las fuentes, en el partado de conguraciones se estableció cual rama se debe desplegar en el GitHub Pages.
4. Al seleccionar la rama se crea el action que se ejecutará cada vez que se actualice la rama main. El job del action compilará las fuentes y realizará la publicación en el sub dominio de Github Pages

Realizando esto se automatiza el procedimiento de publicación de las fuentes en un ambiente de producción. Solo con applicar los cambios en la rama main del proyecto, el action se encarga de compilar y 
desplegar de forma automática todos los cambios
