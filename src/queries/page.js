const createTable = `
CREATE TABLE IF NOT EXISTS Paginas(page_id int AUTO_INCREMENT, notebook_id int NOT NULL, texto text, titulo VARCHAR(20), fecha date, 
PRIMARY KEY(page_id), FOREIGN KEY (notebook_id) REFERENCES Notebooks(notebook_id))
`

const getPagesbyNotebookID = `
SELECT page_id, texto, titulo, fecha
FROM Paginas
WHERE notebook_id = ?
`

const checkNotebookbyUserID = `
SELECT notebook_id
FROM Notebooks
WHERE user_id = ? AND notebook_id = ?
`

const checkPagebyUserID = `
SELECT Paginas.page_id
FROM Usuarios
INNER JOIN Notebooks ON Usuarios.user_id=Notebooks.user_id
INNER JOIN Paginas ON Notebooks.notebook_id=Paginas.notebook_id
WHERE Usuarios.user_id=? && Paginas.page_id=?
`


const addPage = `
INSERT INTO Paginas (notebook_id, texto, titulo, fecha) 
VALUES (?, ?, ?, ?)
`

const updatePage = `
UPDATE Paginas
SET texto = ?, titulo = ?, fecha = ?
WHERE page_id = ?;
`

const removePage = `
DELETE FROM Paginas
WHERE page_id = ?;
`


module.exports = {
    createTable,
    getPagesbyNotebookID,
    checkNotebookbyUserID,
    checkPagebyUserID,
    addPage,
    updatePage,
    removePage
}