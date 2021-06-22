const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            { value: 1, name: `${'1.'.green} Crear tarea` },
            { value: 2, name: `${'2.'.green} Listar tareas` },
            { value: 3, name: `${'3.'.green} Listar tareas completadas` },
            { value: 4, name: `${'4.'.green} Listar tareas pendientes` },
            { value: 5, name: `${'5.'.green} Completar tarea(s)` },
            { value: 6, name: `${'6.'.green} Borrar tarea` },
            { value: 0, name: `${'0.'.green} Salir` }
        ]
    }
];

/**
 * Imprime el menu de opciones disponibles en la consola.
 * @returns option: el value de la opcion seleccionada.
 */
const menu = async () => {
    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opción'.white);
    console.log('=========================\n'.green);

    const { option } = await inquirer.prompt(questions);

    return option;
}

/**
 * Pausa la ejecucion del programa y le pide al usuarionque presione ENTER para continuar.
 */
const pause = async () => {
    const question = [
        { type: 'input', name: 'enter', message: `Presione ${'ENTER'.blue} para continuar` }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

/**
 * Solicita al usuario ingresar valores por consola y lee dichos valores.
 * @param {*} message un mensaje descriptivo de lo que el usuario debe ingresar.
 * @returns description: el valor ingresado por consola.
 */
const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate(value) {
                if (value.length === 0)
                    return 'Por favor ingrese un valor';

                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt(question);

    return description;
}

const deleteTaskMenu = async (tasks = []) => {
    const choices = tasks.map((task, index) => {
        const idx = `${index + 1}`.green;

        return {
            value: task.id,
            name: `${idx} ${task.description}`
        }
    });

    choices.unshift({
        value: 0,
        name: '0 '.green + 'Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const { id } = await inquirer.prompt(questions);
    return id;
}

const confirmDelete = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}


const completeTasksMenu = async (tasks = []) => {
    const choices = tasks.map((task, index) => {
        const idx = `${index + 1}`.green;
        
        return {
            value: task.id,
            name: `${idx} ${task.description}`,
            checked: task.completedDate != null
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(questions);
    return ids;
}

module.exports = {
    menu, pause, readInput, deleteTaskMenu, confirmDelete, completeTasksMenu
}