//creation and connection to the "Services" database
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./src/db/servicesdatabase.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado a la base de datos.');
});

// if it don't exist, create the tables
//SQL query statements
const services = ['Tareas', 'Por ver', 'Comprar', 'Descargar', 'Sitios por conocer', 'Páginas web'];
const priorities = ['Alta', 'Media', 'Estándar'];
const statuses = ['Iniciado', 'En espera'];
const archives = ['Video de youtube', 'Video', 'PDF', 'Comprimido', 'Imagen', 'csv', 'iso', 'Texto', 'otro'];
const t_tasks = ['Revisar', 'Curso', 'Ver', 'Leer', 'Organizar', 'Hacer', 'Probar (software)', 'Añadir como hábito', 'Investigación', 'Probar (app)', 'Probar (página)', 'Cosas rápidas', 'Conseguir', 'Probar (vida real)'];
const times = ['Un día', 'Más de un día'];
const reasons = ['Economía', 'Programación', 'Seguridad informática', 'Hábitos saludables', 'Idiomas', 'Búsqueda de empleo', 'Otro']

var service = `CREATE TABLE IF NOT EXISTS servicio (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    servicio VARCHAR UNIQUE NOT NULL
)`;

var type = `CREATE TABLE IF NOT EXISTS tipo (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR UNIQUE NOT NULL,
    servicio INTEGER NOT NULL,
    FOREIGN KEY (servicio) REFERENCES servicio(id)
)`;

var buy = `CREATE TABLE IF NOT EXISTS comprar (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR UNIQUE NOT NULL,
    tipo INTEGER NOT NULL,
    url TEXT,
    FOREIGN KEY (tipo) REFERENCES tipo(id)
)`;

var download = `CREATE TABLE IF NOT EXISTS descargar (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    descripcion TEXT NOT NULL,
    URL TEXT UNIQUE NOT NULL
)`;

var webpage = `CREATE TABLE IF NOT EXISTS pagina (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR UNIQUE NOT NULL,
    descripcion TEXT NOT NULL,
    tipo INTEGER NOT NULL,
    URL TEXT UNIQUE NOT NULL,
    FOREIGN KEY (tipo) REFERENCES tipo(id)
)`;

var tovisit = `CREATE TABLE IF NOT EXISTS visitar (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR UNIQUE NOT NULL,
    descripcion TEXT NOT NULL,
    coordenadas TEXT
)`;

var priority = `CREATE TABLE IF NOT EXISTS prioridad (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    prioridad VARCHAR UNIQUE NOT NULL
)`;

var status = `CREATE TABLE IF NOT EXISTS estado (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    estado VARCHAR UNIQUE NOT NULL
)`;

var towatch = `CREATE TABLE IF NOT EXISTS ver (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR NOT NULL,
    tipo INTEGER NOT NULL,
    prioridad INTEGER NOT NULL,
    estado INTEGER NOT NULL,
    FOREIGN KEY (tipo) REFERENCES tipo(id),
    FOREIGN KEY (prioridad) REFERENCES prioridad(id),
    FOREIGN KEY (estado) REFERENCES estado(id)
)`;

var archive = `CREATE TABLE IF NOT EXISTS archivo (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    archivo VARCHAR UNIQUE NOT NULL
)`;

var t_task = `CREATE TABLE IF NOT EXISTS tipo_tarea (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    tipo_tarea VARCHAR UNIQUE NOT NULL
)`;

var time = `CREATE TABLE IF NOT EXISTS tiempo (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    tiempo VARCHAR UNIQUE NOT NULL
)`;

var reason = `CREATE TABLE IF NOT EXISTS razon (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    razon VARCHAR UNIQUE NOT NULL
)`;

var task = `CREATE TABLE IF NOT EXISTS tarea (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    prioridad INTEGER NOT NULL,
    posicion INTEGER NOT NULL,
    archivo INTEGER NOT NULL,
    tipo_tarea INTEGER NOT NULL,
    estado INTEGER NOT NULL,
    tiempo INTEGER NOT NULL,
    descripcion TEXT,
    razon INTEGER,
    ruta TEXT,
    FOREIGN KEY (prioridad) REFERENCES prioridad(id),
    FOREIGN KEY (archivo) REFERENCES archivo(id),
    FOREIGN KEY (tipo_tarea) REFERENCES tipo_tarea(id),
    FOREIGN KEY (estado) REFERENCES estado(id),
    FOREIGN KEY (tiempo) REFERENCES tiempo(id),
    FOREIGN KEY (razon) REFERENCES razon(id)
)`;

//SQL query execution
var tables = [['servicio',service], ['tipo',type], ['comprar',buy], ['descargar',download], ['pagina',webpage], ['visitar', tovisit], ['prioridad', priority], ['estado', status], ['ver', towatch], ['archivo', archive], ['tipo_tarea', t_task], ['tiempo', time], ['razon', reason], ['tarea', task]];
var const_tables = [['servicio', services], ['prioridad', priorities], ['estado', statuses], ['archivo', archives], ['tipo_tarea', t_tasks], ['tiempo', times], ['razon', reasons]];

tables.forEach((table) => {
    nam = table[0];
    tab = table[1];
    db.run(tab, (err) => {
        if (err) {
            console.error(err.message);
        }
    });
});

//Running insert data into tables function
function t_creation(){
    const_tables.forEach((const_table) => {
        tab = const_table[0];
        lis = const_table[1];
        lis.forEach((i) => {
            db.run(`INSERT INTO '${tab}' ('${tab}') VALUES ('${i}')`, (err) => {
                if (err) {
                    console.error(err.message);
                }else{
                    console.log(`Valor '${i}' añadido a '${tab}' correctamente.`);
                }
            });
          });
    });
};

module.exports = {
    db,
    t_creation
};
