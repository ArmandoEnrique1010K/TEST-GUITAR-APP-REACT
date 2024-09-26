# TEST-GUITAR-APP-REACT

Aplicacion de guitarra hecho con REACT

- Me quedo con la libreria TONEJS porque ofrece varios efectos de sonido.
- Me rendi, aunque solamente ME FALTABAN 7 LINEAS DE CODIGO, tuve que usar chatgpt para investigar sobre un algoritmo dinamico que permita asignar una tecla a cada cuerda de la guitarra.
- Se puede controlar el volumen por cada una de las cuerdas de la guitarra.
- Pulsa el boton ON para desactivar la funcionalidad de reproducir una nota si la nota anterior se encontraba en una cuerda diferente.

Pendiente:

- Investigar como reproducir una nota de la guitarra pulsando una tecla del teclado.
- Aun no voy a implementarle un hook personalizado ni el contexto de React, pues falta bastante por construir

ESTE ES EL AVANCE:

<img title="" src="file:///C:/Users/USER/Desktop/ArmandoEnrique1010K/TEST-GUITAR-APP-REACT/assets/2024-09-26-00-24-16-image.png" alt="2024-09-26-00-24-16-image.png" data-align="center" width="834">

DISEÑO PROPUESTO:

![](assets/2024-09-21-19-39-01-image.png)

BUGS:

- Al tocar una cuerda con el teclado del PC o Laptop, asegurate de desactivar la tecla MAYUS

- Al intentar tocar una cuerda con el teclado en modo OFF, no va a funcionar, trata de tocar una cuerda diferente y luego volver a pulsar el boton OFF para activar el modo ON y luego pulsalo para activar el modo OFF, solamente asi funcionara.
