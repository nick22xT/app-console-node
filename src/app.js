require('colors');

const { menu, pause, readInput, deleteTaskMenu, confirmDelete, completeTasksMenu } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { saveInfo, readInfo } = require('./helpers/saveFile');

const main = async () => {
    let opt = 0;
    const tareas = new Tareas();
    const infoDB = readInfo();

    if (infoDB)
        tareas.cargarTareasFromArray(infoDB);

    do {
        opt = await menu();

        switch (opt) {
            case 1:
                const desc = await readInput('Descripción:');
                tareas.crearTarea(desc);
                break;
            case 2:
                tareas.listatoFormateado();
                break;
            case 3:
                tareas.listarCompletadasPendientes();
                break;
            case 4:
                tareas.listarCompletadasPendientes(false);
                break;
            case 5:
                const ids = await completeTasksMenu(tareas.arrayList);
                tareas.toggleCompletes(ids);
                break;
            case 6:
                const id = await deleteTaskMenu(tareas.arrayList);

                if (id != 0) {
                    const ok = await confirmDelete('¿Estas seguro?');

                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
            case 0:
                break;

            default:
                break;
        }

        saveInfo(tareas.arrayList);

        if (opt != 0) await pause();
    } while (opt != 0);
}

main();