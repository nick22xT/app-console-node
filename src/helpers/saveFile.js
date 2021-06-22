const fs = require('fs');
const path = './src/db/data.json';

/**
 * Escribe en un archivo, en formato json, la info que viene en la variable data.
 * @param {*} data 
 */
const saveInfo = (data) => {
    fs.writeFileSync(path, JSON.stringify(data));
}

/**
 * Lee la info que se encuentra en el archivo.
 * @returns La info leida del archivo, convertida a un objeto literal de JavaScript.
 */
const readInfo = () => {
    if (!fs.existsSync(path))
        return null;

    const info = fs.readFileSync(path, { encoding: 'utf-8' });
    return JSON.parse(info);
}

module.exports = {
    saveInfo, readInfo
}