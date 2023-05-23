const createTable = `
CREATE TABLE IF NOT EXISTS Paginas(page_id int AUTO_INCREMENT, notebook_id int NOT NULL, texto text, titulo VARCHAR(20), fecha date, 
PRIMARY KEY(page_id), FOREIGN KEY (notebook_id) REFERENCES Notebooks(notebook_id))
`

const getPagesbyNotebookID = `
SELECT page_id, texto, titulo, fecha
FROM Paginas
WHERE notebook_id = ?
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
    addPage,
    updatePage,
    removePage
}