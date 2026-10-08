# Tus series

Aplicación estática para seguir capítulos, progreso y próximos estrenos.

## Revisión del 8 de octubre de 2026

Se contrastaron las 76 fichas con sus registros de emisiones y los anuncios disponibles. Las fuentes se muestran en cada ficha. `catalog-review.json` conserva la revisión y `release-data.js` contiene las actualizaciones de temporadas y fechas.

El calendario utiliza la hora de Madrid. La plataforma y el país indican dónde se anuncia la emisión; una fecha estadounidense no confirma disponibilidad en España. Los totales de temporada sin anunciar permanecen pendientes y sólo se cuentan los capítulos conocidos. Se conserva la numeración de las plataformas y sus especiales cuando difiere de TVmaze.

Los capítulos cambian a estrenados al llegar su fecha y hora programadas. Si sólo se conoce el día, se espera a que termine ese día. La pantalla se actualiza cada minuto y al volver a la app. Este cálculo usa el calendario guardado: los cambios posteriores de programación requieren otra revisión de las fuentes.

El progreso, ritmo de visionado e historial se conservan en el almacenamiento local. La app y los datos de estreno quedan en caché para su uso sin conexión después de la primera carga.

## Abrir y comprobar

Sirve esta carpeta con cualquier servidor estático, por ejemplo:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Abre `http://127.0.0.1:8765/`. Las pruebas no requieren paquetes adicionales:

```sh
node tests/releases.test.cjs
node tests/offline.test.cjs
```
