// ===== VARIABLES GLOBALES =====
let contador = 0;
let colores = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
let indiceColor = 0;

// ===== FUNCIONES BÁSICAS =====

/**
 * Cambiar el color de fondo del body
 */
function cambiarColor() {
    document.body.style.background = `linear-gradient(135deg, ${colores[indiceColor]} 0%, ${colores[(indiceColor + 1) % colores.length]} 100%)`;
    indiceColor = (indiceColor + 1) % colores.length;
    
    // Mostrar mensaje temporal
    mostrarMensaje('¡Color de fondo cambiado!', 'success');
}

/**
 * Mostrar una alerta personalizada
 */
function mostrarAlerta() {
    const nombre = prompt('¿Cuál es tu nombre?');
    if (nombre) {
        alert(`¡Hola, ${nombre}! Bienvenido al sandbox de HTML, CSS y JavaScript! 🚀`);
        mostrarMensaje(`Usuario ${nombre} se ha identificado`, 'info');
    } else {
        alert('No ingresaste tu nombre, ¡pero aún así eres bienvenido!');
    }
}

/**
 * Mostrar/ocultar elemento
 */
function toggleVisibilidad() {
    const elemento = document.getElementById('elemento-oculto');
    if (elemento.style.display === 'none' || elemento.style.display === '') {
        elemento.style.display = 'block';
        mostrarMensaje('Elemento mostrado', 'success');
    } else {
        elemento.style.display = 'none';
        mostrarMensaje('Elemento ocultado', 'info');
    }
}

// ===== FUNCIONES DEL CONTADOR =====

/**
 * Incrementar contador
 */
function incrementar() {
    contador++;
    document.getElementById('numero-contador').textContent = contador;
    
    // Efecto visual
    const numeroElement = document.getElementById('numero-contador');
    numeroElement.style.color = contador > 0 ? '#27ae60' : '#e74c3c';
    numeroElement.style.transform = 'scale(1.2)';
    
    setTimeout(() => {
        numeroElement.style.transform = 'scale(1)';
    }, 200);
}

/**
 * Decrementar contador
 */
function decrementar() {
    contador--;
    document.getElementById('numero-contador').textContent = contador;
    
    // Efecto visual
    const numeroElement = document.getElementById('numero-contador');
    numeroElement.style.color = contador < 0 ? '#e74c3c' : '#27ae60';
    numeroElement.style.transform = 'scale(1.2)';
    
    setTimeout(() => {
        numeroElement.style.transform = 'scale(1)';
    }, 200);
}

// ===== CALCULADORA =====

/**
 * Realizar cálculo simple
 */
function calcular() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operacion = document.getElementById('operacion').value;
    const resultadoDiv = document.getElementById('resultado');
    
    // Validar que los números sean válidos
    if (isNaN(num1) || isNaN(num2)) {
        resultadoDiv.textContent = 'Error: Por favor ingresa números válidos';
        resultadoDiv.style.color = '#e74c3c';
        return;
    }
    
    let resultado;
    
    switch (operacion) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '*':
            resultado = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                resultadoDiv.textContent = 'Error: No se puede dividir por cero';
                resultadoDiv.style.color = '#e74c3c';
                return;
            }
            resultado = num1 / num2;
            break;
        default:
            resultado = 'Operación no válida';
    }
    
    resultadoDiv.textContent = `Resultado: ${typeof resultado === 'number' ? resultado.toFixed(2) : resultado}`;
    resultadoDiv.style.color = '#27ae60';
    
    // Efecto de animación
    resultadoDiv.style.transform = 'scale(1.1)';
    setTimeout(() => {
        resultadoDiv.style.transform = 'scale(1)';
    }, 300);
}

// ===== VALIDACIÓN EN TIEMPO REAL =====

/**
 * Validar texto mientras se escribe
 */
function validarTexto() {
    const input = document.getElementById('input-validacion');
    const mensaje = document.getElementById('mensaje-validacion');
    const texto = input.value.trim();
    
    // Limpiar clases anteriores
    mensaje.className = '';
    
    if (texto.length === 0) {
        mensaje.textContent = 'Escribe algo para ver la validación en acción';
        mensaje.className = '';
    } else if (texto.length < 3) {
        mensaje.textContent = 'El texto debe tener al menos 3 caracteres';
        mensaje.className = 'invalido';
    } else if (texto.length > 50) {
        mensaje.textContent = 'El texto no puede tener más de 50 caracteres';
        mensaje.className = 'invalido';
    } else if (!/^[a-zA-Z0-9\s]+$/.test(texto)) {
        mensaje.textContent = 'Solo se permiten letras, números y espacios';
        mensaje.className = 'invalido';
    } else {
        mensaje.textContent = '✅ ¡Texto válido! Tiene ' + texto.length + ' caracteres';
        mensaje.className = 'valido';
    }
}

// ===== FUNCIÓN PARA MOSTRAR MENSAJES TEMPORALES =====

/**
 * Mostrar mensaje temporal en la pantalla
 * @param {string} texto - El texto del mensaje
 * @param {string} tipo - Tipo de mensaje (success, error, info, warning)
 */
function mostrarMensaje(texto, tipo = 'info') {
    // Crear elemento del mensaje
    const mensaje = document.createElement('div');
    mensaje.textContent = texto;
    mensaje.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    `;
    
    // Colores según el tipo
    const colores = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db',
        warning: '#f39c12'
    };
    
    mensaje.style.backgroundColor = colores[tipo] || colores.info;
    
    // Añadir al body
    document.body.appendChild(mensaje);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        mensaje.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (mensaje.parentNode) {
                mensaje.parentNode.removeChild(mensaje);
            }
        }, 300);
    }, 3000);
}

// ===== FUNCIONES UTILITARIAS =====

/**
 * Generar número aleatorio entre min y max
 * @param {number} min - Número mínimo
 * @param {number} max - Número máximo
 * @returns {number} Número aleatorio
 */
function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Cambiar tema (claro/oscuro) - función adicional
 */
function toggleTema() {
    const body = document.body;
    const temaOscuro = body.classList.contains('tema-oscuro');
    
    if (temaOscuro) {
        body.classList.remove('tema-oscuro');
        mostrarMensaje('Tema claro activado', 'info');
    } else {
        body.classList.add('tema-oscuro');
        mostrarMensaje('Tema oscuro activado', 'info');
    }
}

/**
 * Scroll suave a una sección
 * @param {string} id - ID del elemento de destino
 */
function scrollSuave(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== EVENTOS DEL DOM =====

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Sandbox cargado correctamente!');
    
    // Añadir event listener al formulario para prevenir envío real
    const formulario = document.querySelector('.formulario-ejemplo');
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            mostrarMensaje('Formulario enviado correctamente (simulación)', 'success');
            console.log('Datos del formulario:', new FormData(formulario));
        });
    }
    
    // Añadir efectos hover a las imágenes de la galería
    const imagenesGaleria = document.querySelectorAll('.galeria img');
    imagenesGaleria.forEach(img => {
        img.addEventListener('click', function() {
            mostrarMensaje('Imagen clickeada: ' + this.alt, 'info');
        });
    });
    
    // Atajos de teclado
    document.addEventListener('keydown', function(e) {
        // Ctrl + Alt + C = Cambiar color
        if (e.ctrlKey && e.altKey && e.key === 'c') {
            e.preventDefault();
            cambiarColor();
        }
        
        // Ctrl + Alt + T = Toggle tema
        if (e.ctrlKey && e.altKey && e.key === 't') {
            e.preventDefault();
            toggleTema();
        }
    });
    
    mostrarMensaje('¡Bienvenido al sandbox! Explora y experimenta 🎉', 'success');
});

// ===== FUNCIONES ADICIONALES PARA EXPERIMENTAR =====

/**
 * Crear elemento dinámicamente
 */
function crearElementoDinamico() {
    const contenedor = document.querySelector('main');
    const nuevoElemento = document.createElement('div');
    nuevoElemento.innerHTML = `
        <h3>Elemento creado dinámicamente</h3>
        <p>Este elemento fue creado con JavaScript en ${new Date().toLocaleTimeString()}</p>
        <button onclick="this.parentElement.remove()" style="background: #e74c3c; color: white; border: none; padding: 0.5rem 1rem; border-radius: 3px; cursor: pointer;">
            Eliminar este elemento
        </button>
    `;
    nuevoElemento.style.cssText = `
        background: #f8f9fa;
        border: 2px dashed #3498db;
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 8px;
        animation: aparecer 0.5s ease;
    `;
    
    contenedor.appendChild(nuevoElemento);
    mostrarMensaje('¡Nuevo elemento creado!', 'success');
}

/**
 * Animar elemento
 * @param {string} selector - Selector CSS del elemento
 */
function animarElemento(selector) {
    const elemento = document.querySelector(selector);
    if (elemento) {
        elemento.style.animation = 'pulse 1s ease';
        setTimeout(() => {
            elemento.style.animation = '';
        }, 1000);
    }
}

// ===== ANIMACIONES CSS ADICIONALES =====
const estilosAnimaciones = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .tema-oscuro {
        filter: invert(1) hue-rotate(180deg);
    }
    
    .tema-oscuro img {
        filter: invert(1) hue-rotate(180deg);
    }
`;

// Añadir estilos de animaciones al head
const styleSheet = document.createElement('style');
styleSheet.textContent = estilosAnimaciones;
document.head.appendChild(styleSheet);

// ===== CONSOLA DE DESARROLLADOR =====
console.log(`
🎨 SANDBOX HTML/CSS/JavaScript
================================
Funciones disponibles:
- cambiarColor() - Cambia el color de fondo
- mostrarAlerta() - Muestra una alerta personalizada
- toggleVisibilidad() - Muestra/oculta elemento
- incrementar() / decrementar() - Controla el contador
- calcular() - Calculadora simple
- validarTexto() - Validación en tiempo real
- crearElementoDinamico() - Crea elementos dinámicamente
- toggleTema() - Cambia entre tema claro/oscuro

Atajos de teclado:
- Ctrl + Alt + C: Cambiar color de fondo
- Ctrl + Alt + T: Cambiar tema

¡Experimenta y diviértete aprendiendo! 🚀
`);

// ===== EJEMPLOS DE ALMACENAMIENTO LOCAL (Solo para referencia) =====
// NOTA: No usar en producción sin verificar compatibilidad

/**
 * Guardar preferencias del usuario (ejemplo educativo)
 */
function guardarPreferencias() {
    const preferencias = {
        colorFavorito: '#3498db',
        temaOscuro: false,
        contadorActual: contador,
        fechaUltimaVisita: new Date().toISOString()
    };
    
    // En un entorno real usarías localStorage
    // localStorage.setItem('preferenciasSandbox', JSON.stringify(preferencias));
    console.log('Preferencias que se guardarían:', preferencias);
    mostrarMensaje('Preferencias guardadas (simulación)', 'success');
}

/**
 * Cargar preferencias del usuario (ejemplo educativo)
 */
function cargarPreferencias() {
    // En un entorno real usarías localStorage
    // const preferencias = JSON.parse(localStorage.getItem('preferenciasSandbox') || '{}');
    const preferencias = {
        colorFavorito: '#3498db',
        temaOscuro: false,
        contadorActual: 0
    };
    
    console.log('Preferencias que se cargarían:', preferencias);
    mostrarMensaje('Preferencias cargadas (simulación)', 'info');
    return preferencias;
}