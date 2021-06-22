const Tarea = require('./tarea');

/**
 * _list: 
 *      sdcwe232-34f4-csdf4: { description: 'algo', completedDate: 34242 } },
 *      ...
 */
class Tareas {
    _list;

    constructor() {
        this._list = {};
    }

    get arrayList() {
        const list = [];

        Object.keys(this._list).forEach(key => {
            list.push(this._list[key]);
        });

        return list;
    }

    crearTarea(description = '') {
        const tarea = new Tarea(description);
        this._list[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(x => this._list[x.id] = x);
    }

    listatoFormateado() {
        console.log();
        this.arrayList.forEach((x, index) => {
            const idx = `${index + 1}`.green;
            console.log(`${idx} ${x.description} :: ${x.completedDate ? 'Completada'.green : 'Pendiente'.red}`);
        });
    }

    listarCompletadasPendientes(completadas = true) {
        let tareas;

        if (completadas)
            tareas = this.arrayList.filter(x => x.completedDate != null);
        else
            tareas = this.arrayList.filter(x => x.completedDate == null);

        console.log();
        tareas.forEach((x, index) => {
            const idx = `${index + 1}`.green;
            console.log(`${idx} ${x.description} :: ${x.completedDate ? x.completedDate.green : 'Pendiente'.red}`);
        });
    }

    borrarTarea(id) {
        if (this._list[id])
            delete this._list[id];
    }

    toggleCompletes(ids = []) {
        ids.forEach(id => {
            const tarea = this._list[id];

            if (!tarea.completedDate) {
                tarea.completedDate = new Date().toISOString();
            }
        });

        this.arrayList.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._list[tarea.id].completedDate = null;
            }
        });
    }
}

module.exports = Tareas;