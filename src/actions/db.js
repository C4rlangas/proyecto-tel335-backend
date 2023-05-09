//* DEPENDENCIES AND MODULES*/
const database = require('../db.js');

const tableInitializer = () => {

    // Tabla Usuarios
    
        let query =`CREATE TABLE IF NOT EXISTS Usuarios2(user_id int AUTO_INCREMENT, nombre VARCHAR(50), apellido VARCHAR(50), username VARCHAR(20),
                    email VARCHAR(50), password VARCHAR(60), PRIMARY KEY(user_id))`
    
        database.query(query, (err) => {
            if (err) throw err;
            
        });
    
    // Tabla Notebooks
    
        query =`CREATE TABLE IF NOT EXISTS Notebooks2(notebook_id int AUTO_INCREMENT, user_id int, titulo VARCHAR(20), color VARCHAR(7), 
                PRIMARY KEY(notebook_id), FOREIGN KEY (user_id) REFERENCES Usuarios(user_id))`
    
        database.query(query, (err) => {
            if (err) throw err;
            
        });
    
    // Tabla Paginas
    
        query =`CREATE TABLE IF NOT EXISTS Paginas2(page_id int AUTO_INCREMENT, notebook_id int, titulo VARCHAR(20), fecha date, texto text,
                PRIMARY KEY(page_id), FOREIGN KEY (notebook_id) REFERENCES Notebooks(notebook_id))`
    
        database.query(query, (err) => {
            if (err) throw err;
            
        });
    
        const message = `TABLES CREATED`
        return message
    }

    module.exports = {
        tableInitializer
    }