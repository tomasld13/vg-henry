require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, API_KEY
} = process.env;
let sequelize = process.env.NODE_ENV === "production" ? new Sequelize({
  database: process.env.PGDATABASE || DB_NAME,
  dialect: "postgres",
  host: process.env.PGHOST || DB_HOST,
  port:  process.env.PGPORT || 3001,
  username: process.env.PGUSER || DB_USER,
  password: process.env.PGPASSWORD || DB_PASSWORD,
  pool: {
    max: 3,
    min: 1,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }, 
    keepAlive: true
  },
  ssl: true,
}) : 
  new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
/*
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
*/
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre } = sequelize.models;
// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Videogame.belongsToMany(Genre, { through: 'video_genre' });
Genre.belongsToMany(Videogame, { through: 'video_genre' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,
  API_KEY   // para importart la conexión { conn } = require('./db.js');
};
