<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Videogames
Por Tomás Ledesma.
Deploy: https://vg-henry.vercel.app/
## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

## Comenzando

La idea general es una aplicación en la cual se puedan ver los distintos videojuegos disponibles junto con información relevante de los mismos utilizando la api externa [rawg](https://rawg.io/apidocs) y a partir de ella poder, entre otras cosas:

  - Buscar videjuegos
  - Filtrarlos / Ordenarlos
  - Agregar nuevos videojuegos

#### Tecnologías usadas:

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend

__Ruta principal__: contiene:
- [ ] Input de búsqueda para encontrar videojuegos por nombre
- [ ] Área donde se verá el listado de videojuegos. Muestra su:
  - Imagen
  - Nombre
  - Géneros
- [ ] Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros.
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
- [ ] Paginado para ir buscando y mostrando los siguientes videojuegos, 15 juegos por pagina, mostrando los primeros 15 en la primer pagina.

__Ruta de detalle de videojuego__: contiene:
- [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
- [ ] Descripción
- [ ] Fecha de lanzamiento
- [ ] Rating
- [ ] Plataformas

__Ruta de creación de videojuegos__: contiene:
- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Descripción
  - Fecha de lanzamiento
  - Rating
- [ ] Posibilidad de seleccionar/agregar varios géneros
- [ ] Posibilidad de seleccionar/agregar varias plataformas
- [ ] Botón/Opción para crear un nuevo videojuego

#### Base de datos

El modelo de la base de datos contiene las siguientes entidades (Aquellas propiedades marcadas con asterísco deben ser obligatorias):

- [ ] Videojuego con las siguientes propiedades:
  - ID: *
  - Nombre *
  - Descripción *
  - Fecha de lanzamiento
  - Rating
  - Plataformas *
- [ ] Genero con las siguientes propiedades:
  - ID
  - Nombre

#### Backend

Se debe desarrolló un servidor en Node/Express con las siguientes rutas:

- [ ] __GET /videogames__:
  - Obtener un listado de los videojuegos
  - Debe devuelve solo los datos necesarios para la ruta principal
- [ ] __GET /videogames?name="..."__:
  - Obtiene un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
  - Si no existe ningún videojuego muestra un mensaje adecuado
- [ ] __GET /videogame/{idVideogame}__:
  - Obtiene el detalle de un videojuego en particular
  - Trae solo los datos pedidos en la ruta de detalle de videojuego
  - Incluye los géneros asociados
- [ ] __GET /genres__:
  - Obtiene todos los tipos de géneros de videojuegos posibles
  - En una primera trae los juegos desde rawg y los guarda en su propia base de datos y luego ya los utiliza desde allí
- [ ] __POST /videogame__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  - Crea un videojuego en la base de datos

#### Testing

- [ ] Rutas del backend con sus tests respectivos
- [ ] Modelo de la base de datos con sus tests respectivos
