# Tus series

Aplicación estática para seguir capítulos, progreso y próximos estrenos.

## Actualización de series activas del 19 de octubre de 2026

Revisados 64 títulos: las 63 series activas o pendientes de continuidad en TVmaze, consultando de nuevo sus fichas, temporadas y episodios, y Una fiesta de muerte mediante Antena 3. El catálogo conserva 97 series y el calendario reúne 6.775 estrenos fechados, con 74 próximos estrenos a mediodía del 19/10/2026. Las series finalizadas mantienen su fecha de revisión individual.

Añadidas 13 fechas: cinco de Furia, siete de Dexter: Resurrection y la reunión de Love Is Blind (USA), anunciada por Netflix para el 09/11 a las 03:00 de Madrid. Actualizados los títulos publicados, el calendario y los horarios de Vision Quest, y la emisión de Koh-Lanta del 27/10 a las 21:10 confirmada por TF1.

Incorporada la renovación oficial de Maximum Pleasure Guaranteed por una segunda temporada. TVmaze registra seis capítulos previstos para Atasco T5, ocho para The Four Seasons T3 y 22 para Ghosts T6; las fechas aún no anunciadas siguen pendientes y los recuentos se atribuyen al proveedor. No se utilizan como horas de estreno las marcas automáticas de mediodía de TVmaze.

La revisión se refleja en las fichas, la app y el calendario. La nueva caché sin conexión permite recibir los datos actualizados al volver a abrir la app; el progreso, ritmo e historial de visionado se conservan.

## Revisión completa del 11 de octubre de 2026

Se han vuelto a consultar las 97 series: identidad, estado, temporadas, capítulos y fechas registradas. Las fichas incluyen sus fuentes y la fecha de revisión. `catalog-review.json` conserva el detalle de la revisión y `release-data.js` contiene las actualizaciones del catálogo y el calendario.

El calendario reúne 6.370 estrenos fechados que se pueden asociar a la numeración de la app, con 71 próximos estrenos conocidos a fecha de la revisión y registros hasta febrero de 2027. Se han ampliado, entre otros, Koh-Lanta, Dexter: Resurrection y Only Murders in the Building; corregido los especiales de People Magazine Investigates y los 20 capítulos de Brain Games: On the Road; y actualizado las temporadas futuras y los estados de emisión.

Puedes saltar directamente a cualquier mes, desplegar todos los próximos estrenos y consultar todas las temporadas pendientes de fecha. Cada estreno distingue el anuncio de la plataforma del registro de episodios del proveedor.

El calendario utiliza la hora de Madrid. La plataforma y el país indican dónde se anuncia la emisión; una fecha estadounidense no confirma disponibilidad en España. Las fechas y los totales sin anunciar permanecen pendientes. Se conserva la numeración de las plataformas y sus especiales cuando difiere de TVmaze. No se asignan fechas a recopilatorios históricos o vídeos que no tengan una correspondencia verificable.

Los capítulos cambian a estrenados al llegar su fecha y hora programadas. Si sólo se conoce el día, se espera a que termine ese día. La pantalla se actualiza cada minuto y al volver a la app. Este cálculo usa el calendario guardado: los cambios posteriores de programación requieren otra revisión de las fuentes.

El progreso, ritmo de visionado e historial se conservan en el almacenamiento local. La app y los datos de estreno quedan en caché para su uso sin conexión después de la primera carga. Al activarse una nueva versión de la caché, la pantalla se recarga para mostrar los datos actualizados.

Añadidas Vision Quest, El crimen tiene dos caras, Una fiesta de muerte, Si es martes, es asesinato, Chad Powers, Lección criminal, Cómo atrapé a mi asesino y Bodas de infarto, con fichas, capítulos y fuentes. El documento `lista de series.pages` incluye también los ocho títulos.

Añadida Forensic Files (Crímenes imperfectos) el 13/10/2026, con 14 temporadas, los títulos y fechas de sus 400 episodios regulares, portada, plataformas y fuentes. Con esta incorporación, el catálogo pasó a reunir 98 series y 6.770 estrenos fechados. El título figura también en `lista de series.pages`, entre Fargo y Friends.

Retirada Margo's Got Money Troubles el 18/10/2026 del catálogo, el calendario y las listas guardadas. Tras esa retirada, el catálogo reunía 97 series y 6.762 estrenos fechados.

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
