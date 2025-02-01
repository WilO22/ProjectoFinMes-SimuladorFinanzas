// 1. Definición de variables globales
let ingresos = 0;
let egresos = 0;

const formulario = document.getElementById('formularioFinanzas');
const tablaMovimientos = document.getElementById('tablaMovimientos');
const ctx = document.getElementById('graficoFinanzas').getContext('2d');

// 2. Inicialización del gráfico
const graficoFinanzas = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Ingresos', 'Egresos'],
        datasets: [{
            data: [ingresos, egresos],
            backgroundColor: ['#4caf50', '#f44336'],
            borderWidth: 1,
        }]
    },
    options: {
        responsive: true,
    }
});

// 3. Configuración de eventos
formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    agregarMovimiento();
});

// 4. Funciones principales
function agregarMovimiento() {
    const descripcion = document.getElementById('descripcion').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const tipo = document.getElementById('tipo').value;
    
    if (!descripcion || isNaN(monto)) {
        alert("Por favor, complete todos los campos");
        return;
    }
    
    if (tipo === "entrada") {
        ingresos += monto;
    } else {
        egresos += monto;
    }
    
    actualizarGrafico();
    agregarFilaTabla(descripcion, monto, tipo);
    formulario.reset();
}

function agregarFilaTabla(descripcion, monto, tipo) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${descripcion}</td>
        <td>S/. ${monto.toFixed(2)}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td>${tipo}</td>
        <td><button onclick="eliminarMovimiento(this, ${monto}, '${tipo}')">Eliminar</button></td>
    `;
    tablaMovimientos.appendChild(fila);
}

function eliminarMovimiento(boton, monto, tipo) {
    if (tipo === "entrada") {
        ingresos -= monto;
    } else {
        egresos -= monto;
    }
    
    boton.parentElement.parentElement.remove();
    actualizarGrafico();
}

function actualizarGrafico() {
    graficoFinanzas.data.datasets[0].data = [ingresos, egresos];
    graficoFinanzas.update();
}