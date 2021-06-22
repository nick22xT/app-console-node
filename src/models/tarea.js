const { v4: uuid } = require('uuid');

class Tarea {

    id;
    description;
    completedDate;

    constructor(description) {
        this.id = uuid();
        this.description = description;
        this.completedDate = null;
    }
}

module.exports = Tarea;