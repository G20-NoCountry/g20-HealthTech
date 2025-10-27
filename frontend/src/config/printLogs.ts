//$ Crea una funcion que reciba un string e imprima en debug conosle log, que además se pueda desactivar mediante una variable de entorno.

const PRINT_DEBUG_LOG = import.meta.env.VITE_PRINT_DEBUG_LOG as string;
const MESSAGE_LIMIT = 2;

export const printDebug = (...messages: string[]): void => {
    if (PRINT_DEBUG_LOG === "true") {
        messages.slice(0, MESSAGE_LIMIT).forEach((message) => {
            console.debug(message);
        });
    }
}