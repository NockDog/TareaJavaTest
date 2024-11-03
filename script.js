//Lógica para el temporizador
let tiempoRestante = 30;
let temporizadorInterval;

function iniciarTemporizador() {
    tiempoRestante = 30;
    document.getElementById('tiempo-restante').textContent = tiempoRestante;
    temporizadorInterval = setInterval(() => {
        tiempoRestante--;
        document.getElementById('tiempo-restante').textContent = tiempoRestante;
        if (tiempoRestante <= 0) {
            clearInterval(temporizadorInterval);
            avanzarPregunta();
        }
    }, 1000);
}

function pausarTemporizador() {
    clearInterval(temporizadorInterval);
}

// Llamar a iniciarTemporizador() al cargar una nueva pregunta
const preguntas = [
    {
        pregunta: "¿Cuál es el lenguaje de marcado utilizado para crear páginas web?",
        opciones: ["JavaScript", "HTML", "CSS", "Python"],
        respuesta: "HTML"
    },
    {
        pregunta: "¿Cuál es el símbolo para seleccionar un elemento por clase en CSS?",
        opciones: [".", "#", "*", "&"],
        respuesta: "."
    },
    {
        pregunta: "¿Qué método se utiliza para añadir un elemento al final de un array en JavaScript?",
        opciones: ["push()", "pop()", "shift()", "unshift()"],
        respuesta: "push()"
    },
    // Añade más preguntas según sea necesario
];

// Obtener elementos del DOM
const inicioPantalla = document.getElementById('inicio');
const comenzarBtn = document.getElementById('comenzar-btn');
const preguntasPantalla = document.getElementById('preguntas');

// Variables de control del quiz
let preguntaActual = 0;
let puntaje = 0;

// Evento para comenzar el quiz
comenzarBtn.addEventListener('click', () => {
    inicioPantalla.classList.add('ocultar');
    preguntasPantalla.classList.remove('ocultar');
    mostrarPregunta();
    iniciarTemporizador();
});

const preguntaTexto = document.getElementById('pregunta-texto');
const opcionesLista = document.getElementById('opciones-lista');

function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];
    preguntaTexto.textContent = pregunta.pregunta;
    opcionesLista.innerHTML = '';

    pregunta.opciones.forEach(opcion => {
        const li = document.createElement('li');
        li.textContent = opcion;
        li.classList.add('opcion');
        li.addEventListener('click', seleccionarOpcion);
        opcionesLista.appendChild(li);
    });
}

let opcionSeleccionada = null;

function seleccionarOpcion(e) {
    // Remover la clase 'seleccionado' de todas las opciones
    const opciones = document.querySelectorAll('.opcion');
    opciones.forEach(op => op.classList.remove('seleccionado'));

    // Añadir la clase 'seleccionado' a la opción clicada
    e.target.classList.add('seleccionado');
    opcionSeleccionada = e.target.textContent;
}
const siguienteBtn = document.getElementById('siguiente-btn');

siguienteBtn.addEventListener('click', () => {
    pausarTemporizador();
    verificarRespuesta();
    avanzarPregunta();
});

function verificarRespuesta() {
    const pregunta = preguntas[preguntaActual];
    if (opcionSeleccionada === pregunta.respuesta) {
        puntaje++;
    }
    opcionSeleccionada = null;
}

function avanzarPregunta() {
    preguntaActual++;
    if (preguntaActual < preguntas.length) {
        mostrarPregunta();
        iniciarTemporizador();
    } else {
        mostrarResultados();
    }
}

// Obtener elementos de la pantalla de resultados
const resultadosPantalla = document.getElementById('resultados');
const puntajeFinal = document.getElementById('puntaje-final');
const totalPreguntas = document.getElementById('total-preguntas');
const reiniciarBtn = document.getElementById('reiniciar-btn');

function mostrarResultados() {
    preguntasPantalla.classList.add('ocultar');
    resultadosPantalla.classList.remove('ocultar');
    puntajeFinal.textContent = puntaje;
    totalPreguntas.textContent = preguntas.length;
}

reiniciarBtn.addEventListener('click', reiniciarQuiz);

function reiniciarQuiz() {
    resultadosPantalla.classList.add('ocultar');
    inicioPantalla.classList.remove('ocultar');
    preguntaActual = 0;
    puntaje = 0;
}

const retroalimentacion = document.getElementById('retroalimentacion');

function verificarRespuesta() {
    const pregunta = preguntas[preguntaActual];
    if (opcionSeleccionada === pregunta.respuesta) {
        puntaje++;
        mostrarRetroalimentacion(true);
    } else {
        mostrarRetroalimentacion(false);
    }
    opcionSeleccionada = null;
}

function mostrarRetroalimentacion(esCorrecto) {
    retroalimentacion.classList.remove('ocultar');
    if (esCorrecto) {
        retroalimentacion.textContent = "¡Correcto!";
        retroalimentacion.classList.add('correcto');
    } else {
        retroalimentacion.textContent = `Incorrecto. La respuesta correcta era: ${preguntas[preguntaActual].respuesta}`;
        retroalimentacion.classList.add('incorrecto');
    }
    setTimeout(() => {
        retroalimentacion.classList.add('ocultar');
        retroalimentacion.classList.remove('correcto', 'incorrecto');
    }, 2000);
}