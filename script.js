// SELECCIONAR ELEMENTOS DEL DOM
const nota = document.getElementById("notaInput");
const agregar = document.getElementById("agregarBtn");
const lista = document.querySelector("#listaNotas");

// MOSTRAR EN CONSOLA PARA VERIFICAR
console.log("Input:", nota);
console.log("Botón:", agregar);
console.log("Lista:", lista);

// RECUPERAR NOTAS DEL LOCAL STORAGE
// SI NO EXISTEN, SE CREA UN ARREGLO VACÍO
let notas = JSON.parse(localStorage.getItem("notas")) || [];

// FUNCIÓN PARA GUARDAR LAS NOTAS EN LOCAL STORAGE
function guardarNotas() {

    localStorage.setItem("notas", JSON.stringify(notas));

    console.log("Notas guardadas en Local Storage");
}

// FUNCIÓN PARA MOSTRAR LAS NOTAS EN EL DOM
function renderizarNotas() {

    // LIMPIAR LA LISTA PARA EVITAR DUPLICADOS
    lista.innerHTML = "";

    // RECORRER EL ARREGLO DE NOTAS
    notas.forEach((texto, index) => {

        // CREAR EL LI
        const li = document.createElement("li");

        // AGREGAR EL TEXTO DE LA NOTA
        li.textContent = texto;

        // CREAR BOTÓN ELIMINAR
        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "Eliminar";

        // EVENTO PARA ELIMINAR LA NOTA
        botonEliminar.addEventListener("click", () => {

            // ELIMINAR EL LI DEL DOM
            lista.removeChild(li);

            // ELIMINAR LA NOTA DEL ARREGLO
            notas.splice(index, 1);

            // GUARDAR CAMBIOS EN LOCAL STORAGE
            guardarNotas();

            // VOLVER A RENDERIZAR
            renderizarNotas();

            console.log(`Se eliminó la nota: ${texto}`);
        });

        // AGREGAR BOTÓN AL LI
        li.appendChild(botonEliminar);

        // AGREGAR LI A LA UL
        lista.appendChild(li);
    });
}

// MOSTRAR LAS NOTAS AL CARGAR LA PÁGINA
renderizarNotas();

console.log(`Se cargaron ${notas.length} notas`);

// EVENTO CLICK DEL BOTÓN AGREGAR
agregar.addEventListener("click", () => {

    // GUARDAR EL TEXTO LIMPIO
    const textoNota = nota.value.trim();

    // VALIDAR SI EL INPUT ESTÁ VACÍO
    if (textoNota === "") {

        console.log("La nota está vacía");

        return;
    }

    // AGREGAR LA NOTA AL ARREGLO
    notas.push(textoNota);

    // GUARDAR EN LOCAL STORAGE
    guardarNotas();

    // MOSTRAR NUEVAMENTE LAS NOTAS
    renderizarNotas();

    // LIMPIAR INPUT
    nota.value = "";

    // VOLVER A ENFOCAR EL INPUT
    nota.focus();

    console.log(`Se agregó la nota: ${textoNota}`);
});



