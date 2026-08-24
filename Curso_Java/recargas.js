// ==========================================================================
// SESIÓN 8: Eventos y addEventListener - Kiosco Interactivo de Recargas Prepago
// Mi cuaderno de práctica y notas de aprendizaje
// ==========================================================================

// --------------------------------------------------------------------------
// 1. DATOS Y FUNCIONES DEL KIOSCO
// --------------------------------------------------------------------------

// Aprendí que un arreglo de objetos nos sirve como una cola (queue) de recargas.
// Cada recarga tiene: cliente (texto), monto (número) y procesada (booleano).
let colaRecargas = [
    { cliente: "Carlos Rodríguez", monto: 12500, procesada: false },
    { cliente: "María Fernández", monto: 4500, procesada: false },
    { cliente: "Juan Pérez", monto: 2000, procesada: false },
    { cliente: "Ana Gómez", monto: 15000, procesada: false },
    { cliente: "Luis Morales", monto: 8500, procesada: false }
];

// Función para determinar si el monto es alto, medio o bajo con condicionales if/else.
// Me sirve para clasificar qué tan grande es cada recarga según las reglas de la tienda.
function obtenerNivelMonto(monto) {
    if (monto >= 10000) {
        return "alto"; // 10,000 o más
    } else if (monto >= 3000) {
        return "medio"; // Entre 3,000 y 9,999
    } else {
        return "bajo"; // Menos de 3,000
    }
}

// Aquí practiqué una función flecha (arrow function) con filter.
// El filter busca solo las recargas donde procesada es false, y luego con .length cuento cuántas son.
const contarSinProcesar = (cola) => {
    const sinProcesar = cola.filter(recarga => !recarga.procesada);
    return `Recargas sin procesar: ${sinProcesar.length}`;
};

// Esta función usa un parámetro por defecto (mostrarDetalle = true).
// Si no le paso el segundo parámetro, automáticamente asume que sí queremos ver los detalles.
// Reutilizo la función obtenerNivelMonto para armar la respuesta.
function obtenerDetalleRecarga(recarga, mostrarDetalle = true) {
    if (!recarga) return "No hay recarga seleccionada.";

    const nivel = obtenerNivelMonto(recarga.monto);
    if (mostrarDetalle) {
        return `Cliente: ${recarga.cliente} | Monto: ₡${recarga.monto} | Nivel: ${nivel.toUpperCase()} | Estado: ${recarga.procesada ? 'Procesada' : 'Pendiente'}`;
    } else {
        return `Cliente: ${recarga.cliente} - ₡${recarga.monto}`;
    }
}


// --------------------------------------------------------------------------
// 2. PROCESAR LA COLA (Ejercicios de consola para verificar lo aprendido en F12)
// --------------------------------------------------------------------------
console.log("===  MIS EJERCICIOS Y PRUEBAS EN CONSOLA ===");

// Practicando forEach: Recorro todo el arreglo elemento por elemento e imprimo en pantalla
console.log("\n1. Recorrido con forEach:");
colaRecargas.forEach((recarga, i) => {
    const nivel = obtenerNivelMonto(recarga.monto);
    console.log(` [#${i + 1}] Cliente: ${recarga.cliente} | Monto: ₡${recarga.monto} | Nivel: ${nivel}`);
});

// Practicando encadenamiento de métodos (filter + map):
// Primero filtro las recargas con monto alto, y con map extraigo solo los nombres de los clientes.
const clientesMontoAlto = colaRecargas
    .filter(recarga => obtenerNivelMonto(recarga.monto) === "alto")
    .map(recarga => recarga.cliente);
console.log("\n2. Nombres de clientes con monto ALTO (filter + map):", clientesMontoAlto);

// Practicando formas de acceder a un objeto:
const primeraRecargaDemo = colaRecargas[0];
console.log("\n3. Accediendo a propiedades de distintas formas:");
console.log(" - Con notación de punto (.cliente):", primeraRecargaDemo.cliente);
console.log(" - Con notación de corchetes ['monto']:", primeraRecargaDemo["monto"]);

// Le agrego una nueva propiedad dinámicamente (la hora a la que se solicitó)
primeraRecargaDemo.horaSolicitud = new Date().toLocaleTimeString();
console.log(" - Le agregué la propiedad horaSolicitud:", primeraRecargaDemo.horaSolicitud);

// Con Object.keys puedo ver una lista de todos los nombres de las propiedades (claves) que tiene el objeto
console.log(" - Claves que tiene el objeto (Object.keys):", Object.keys(primeraRecargaDemo));

// Practicando el método shift():
// Hago una copia rápida del arreglo para probar shift() sin borrar mi cola original.
// Aprendí que shift() saca el PRIMER elemento del arreglo y hace que el arreglo sea más corto.
let copiaDemoCola = [colaRecargas];
const recargaExtraida = copiaDemoCola.shift();
console.log("\n4. Probando shift():");
console.log(" - Elemento que sacó shift():", recargaExtraida);
console.log(" - Cuántos quedan ahora en la cola (length):", copiaDemoCola.length);

// Practicando JSON:
// JSON.stringify convierte el objeto/arreglo de JS en texto formateado
console.log("\n5. Convertir a JSON y volver a objeto:");
const colaJSON = JSON.stringify(colaRecargas, null, 2);
console.log(" - Arreglo convertido a texto JSON:\n", colaJSON);

// JSON.parse toma ese texto JSON y lo convierte de vuelta a un objeto/arreglo de JS usable
const colaRestaurada = JSON.parse(colaJSON);
console.log(" - Arreglo reconstruido con JSON.parse():", colaRestaurada);
console.log("=================================================================\n");


// --------------------------------------------------------------------------
// 3 y 4. CAPTURAR ELEMENTOS DEL DOM Y FUNCIÓN PARA DIBUJAR EN LA INTERFAZ
// --------------------------------------------------------------------------

// Uso querySelector para seleccionar los elementos del HTML por su ID (#)
const tarjetaEl = document.querySelector("#recarga");
const clienteEl = document.querySelector("#cliente");
const montoEl = document.querySelector("#monto");
const estadoEl = document.querySelector("#estado");
const colaEl = document.querySelector("#cola");
const btnProcesar = document.querySelector("#btnProcesar");
const buscarEl = document.querySelector("#buscar");
const filtroNivelEl = document.querySelector("#filtroNivel");
const resultadosEl = document.querySelector("#resultados");

// Esta variable guarda la recarga que se está mostrando en pantalla en este momento
let recargaActual = colaRecargas.length > 0 ? colaRecargas[0] : null;

// Esta función es súper importante porque actualiza toda la interfaz.
// Así no tengo que repetir código cada vez que cambia una recarga.
function mostrarRecarga(recarga) {
    // Primero verifico que la tarjeta exista en el HTML para evitar errores en la consola
    if (!tarjetaEl) {
        console.error("¡Ups! No encontré el elemento con id 'recarga' en la página.");
        return;
    }

    // Actualizo el número de la cola en el HTML usando textContent
    if (colaEl) {
        colaEl.textContent = colaRecargas.length;
    }

    // Si ya no quedan más recargas en la cola (cola vacía)
    if (!recarga) {
        recargaActual = null;
        if (clienteEl) clienteEl.textContent = "Sin recargas pendientes";
        if (montoEl) montoEl.textContent = "₡0";
        if (estadoEl) {
            // Uso innerHTML porque voy a meter etiquetas <strong> para poner negritas
            estadoEl.innerHTML = "Estado: <strong>Finalizado</strong>";
        }
        // Cambio las clases con classList
        tarjetaEl.classList.remove("pendiente", "resaltado");
        tarjetaEl.classList.add("procesada");
        tarjetaEl.setAttribute("data-nivel", "ninguno");
        return;
    }

    // Guardo la recarga actual para poder usarla luego en otros eventos
    recargaActual = recarga;

    // Lleno el nombre del cliente y el monto con textContent para mayor seguridad
    if (clienteEl) clienteEl.textContent = recarga.cliente;
    if (montoEl) montoEl.textContent = `₡${recarga.monto.toLocaleString()}`;

    // Averiguo si el monto es alto, medio o bajo
    const nivel = obtenerNivelMonto(recarga.monto);

    // Muestro el estado y el nivel en negrita usando <strong> gracias a innerHTML
    const textoEstado = recarga.procesada ? "Procesada" : "Pendiente";
    if (estadoEl) {
        estadoEl.innerHTML = `${textoEstado} | Nivel: <strong>${nivel.toUpperCase()}</strong>`;
    }

    // Le pongo un atributo personalizado a la tarjeta usando setAttribute
    tarjetaEl.setAttribute("data-nivel", nivel);
    // Y aquí pruebo leerlo con getAttribute para confirmar que quedó bien puesto
    console.log(`[Atributo set/get] El data-nivel de la tarjeta es: '${tarjetaEl.getAttribute("data-nivel")}'`);

    // Modifico las clases del elemento con classList.add y classList.remove segun el estado
    if (recarga.procesada) {
        tarjetaEl.classList.remove("pendiente");
        tarjetaEl.classList.add("procesada");
    } else {
        tarjetaEl.classList.remove("procesada");
        tarjetaEl.classList.add("pendiente");
    }
}


// --------------------------------------------------------------------------
// 5. EVENTOS DE USUARIO: MOUSE Y TECLADO (click, dblclick, mouseover, mouseout, keydown, keyup)
// --------------------------------------------------------------------------

// Hice esta función aparte para no repetir la misma lógica en el click del botón y en la tecla Enter.
function procesarSiguienteRecarga() {
    if (colaRecargas.length > 0) {
        // Con shift() saco el primer cliente de la cola
        const procesada = colaRecargas.shift();
        procesada.procesada = true; // Lo marco como procesado
        console.log(`✅ ¡Recarga procesada! Cliente: ${procesada.cliente}`);
    }

    // Agarro el siguiente cliente que quedó de primero en el arreglo (o null si se acabaron)
    const siguiente = colaRecargas.length > 0 ? colaRecargas[0] : null;
    mostrarRecarga(siguiente); // Vuelvo a dibujar la tarjeta con el nuevo cliente
    console.log(contarSinProcesar(colaRecargas));
}

// 1. EVENTO CLICK: Al hacer clic en el botón, procesa la recarga
if (btnProcesar) {
    btnProcesar.addEventListener("click", () => {
        console.log("-> Hicieron CLICK en el botón de procesar");
        procesarSiguienteRecarga();
    });
}

// 2. EVENTOS EN LA TARJETA (#recarga):
if (tarjetaEl) {
    // EVENTO DBLCLICK: Con doble clic sobre la tarjeta la marco directamente como procesada
    tarjetaEl.addEventListener("dblclick", () => {
        console.log("-> Hicieron DOBLE CLICK sobre la tarjeta");
        if (recargaActual) {
            recargaActual.procesada = true;
            const nivel = obtenerNivelMonto(recargaActual.monto);
            if (estadoEl) {
                estadoEl.innerHTML = `Procesada | Nivel: <strong>${nivel.toUpperCase()}</strong>`;
            }
            tarjetaEl.classList.remove("pendiente");
            tarjetaEl.classList.add("procesada");
            console.log(`✓ Recarga de ${recargaActual.cliente} marcada procesada con dblclick.`);
        }
    });

    // EVENTO MOUSEOVER: Cuando paso el cursor por encima, le agrego la clase "resaltado"
    tarjetaEl.addEventListener("mouseover", () => {
        tarjetaEl.classList.add("resaltado");
    });

    // EVENTO MOUSEOUT: Cuando quito el cursor, le remuevo la clase "resaltado"
    tarjetaEl.addEventListener("mouseout", () => {
        tarjetaEl.classList.remove("resaltado");
    });
}

// 3. EVENTO KEYDOWN: Escucho cuando el usuario presiona una tecla en cualquier parte de la página
document.addEventListener("keydown", (e) => {
    // Reviso e.key para saber exactamente qué tecla fue
    if (e.key === "Enter") {
        e.preventDefault(); // Evito el comportamiento por defecto de la tecla
        console.log("-> Presionaron la tecla ENTER");
        // ¡Reutilización! Llamo a la misma función del botón
        procesarSiguienteRecarga();
    } else if (e.key === "Escape") {
        console.log("-> Presionaron la tecla ESCAPE");
        // Con Escape pongo la recarga en estado "En Espera"
        if (recargaActual && estadoEl) {
            const nivel = obtenerNivelMonto(recargaActual.monto);
            estadoEl.innerHTML = `En Espera | Nivel: <strong>${nivel.toUpperCase()}</strong>`;
            tarjetaEl.classList.remove("procesada");
            tarjetaEl.classList.add("pendiente");
            console.log(`⏸ Recarga de ${recargaActual.cliente} en espera.`);
        }
    }
});

// 4. EVENTO KEYUP: Se dispara justo al soltar la tecla
if (buscarEl) {
    buscarEl.addEventListener("keyup", (e) => {
        // En la consola veo la tecla que soltó el usuario (a diferencia de keydown que es al presionar)
        console.log(`-> Tecla soltada (keyup): '${e.key}'`);
    });
}


// --------------------------------------------------------------------------
// 6. BÚSQUEDA Y FILTROS: EVENTOS DE FORMULARIO (input, change, e.target.value)
// --------------------------------------------------------------------------

// Esta función ayuda a crear elementos <p> y meterlos en la caja de resultados
function renderizarResultados(listaItems, mensajeVacio) {
    if (!resultadosEl) return;

    // Vació la caja antes de poner los nuevos resultados para que no se dupliquen
    resultadosEl.innerHTML = "";

    if (listaItems.length === 0) {
        // Si no hay resultados, creo un párrafo avisando que no hay coincidencias
        const pVacio = document.createElement("p");
        pVacio.className = "resultado-item sin-resultados";
        pVacio.textContent = mensajeVacio;
        resultadosEl.appendChild(pVacio); // Lo agrego al contenedor con appendChild
        return;
    }

    // Si hay resultados, recorro la lista filtrada
    listaItems.forEach(recarga => {
        // 1. Creo un nuevo párrafo con document.createElement
        const p = document.createElement("p");
        p.className = "resultado-item";

        // 2. Le pongo el texto con textContent
        const nivel = obtenerNivelMonto(recarga.monto);
        p.textContent = `👤 ${recarga.cliente} - ₡${recarga.monto.toLocaleString()} [Nivel: ${nivel.toUpperCase()}] ${recarga.procesada ? '(Procesada)' : '(Pendiente)'}`;

        // 3. Lo agrego como hijo a la caja de resultados con appendChild
        resultadosEl.appendChild(p);
    });
}

// 1. EVENTO INPUT: Se dispara en tiempo real con cada letra que escribo en el buscador
if (buscarEl) {
    buscarEl.addEventListener("input", (e) => {
        // Con e.target.value agarro el texto que escribió el usuario
        const textoBusqueda = e.target.value.toLowerCase().trim();
        console.log(`-> Escribiendo en buscador (input): "${e.target.value}"`);

        if (textoBusqueda === "") {
            renderizarResultados([], "Utilice el buscador o select para filtrar la cola.");
            return;
        }

        // Filtro la cola buscando clientes cuyo nombre contenga el texto buscado
        const coincidencias = colaRecargas.filter(recarga =>
            recarga.cliente.toLowerCase().includes(textoBusqueda)
        );

        renderizarResultados(coincidencias, `No se encontraron clientes que coincidan con "${e.target.value}".`);
    });
}

// 2. EVENTO CHANGE: Se dispara al seleccionar una opción distinta en el desplegable (<select>)
if (filtroNivelEl) {
    filtroNivelEl.addEventListener("change", (e) => {
        // Con e.target.value obtengo la opción seleccionada ("todos", "alto", "medio", "bajo")
        const nivelSeleccionado = e.target.value;
        console.log(`-> Cambio de selección (change): "${nivelSeleccionado}"`);

        if (nivelSeleccionado === "todos" || nivelSeleccionado === "") {
            renderizarResultados(colaRecargas, "Mostrando todas las recargas en cola.");
            return;
        }

        // Filtro el arreglo por el nivel seleccionado
        const recargasFiltradas = colaRecargas.filter(recarga =>
            obtenerNivelMonto(recarga.monto) === nivelSeleccionado
        );

        renderizarResultados(recargasFiltradas, `No hay recargas con nivel de monto '${nivelSeleccionado}'.`);
    });
}


// --------------------------------------------------------------------------
// INICIALIZACIÓN DE LA PÁGINA
// --------------------------------------------------------------------------
// Al cargar la página llamo a mostrarRecarga con la primera recarga del arreglo para que la tarjeta no quede vacía
if (colaRecargas.length > 0) {
    mostrarRecarga(colaRecargas[0]);
} else {
    mostrarRecarga(null);
}
