const createTable = `
CREATE TABLE IF NOT EXISTS Notebooks(notebook_id int AUTO_INCREMENT, user_id int NOT NULL, titulo VARCHAR(50), color VARCHAR(7), 
PRIMARY KEY(notebook_id), FOREIGN KEY (user_id) REFERENCES Usuarios(user_id))
`

const getNotebooksbyUserID = `
SELECT notebook_id, titulo, color
FROM Notebooks
WHERE user_id = ?
`

const checkNotebookbyUserID = `
SELECT notebook_id
FROM Notebooks
WHERE user_id = ? AND notebook_id = ?
`

const addNotebook = `
INSERT INTO Notebooks (user_id, titulo, color) 
VALUES (?, ?, ?)
`

const updateNotebook = `
UPDATE Notebooks
SET titulo = ?, color = ?
WHERE notebook_id = ?;
`

const removeNotebook = `
DELETE FROM Notebooks 
WHERE notebook_id = ?;
`


module.exports = {
    createTable,
    getNotebooksbyUserID,
    checkNotebookbyUserID,
    addNotebook,
    updateNotebook,
    removeNotebook
}