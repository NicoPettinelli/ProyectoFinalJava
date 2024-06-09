let gastos = [];

function cargarGastos() {
    const gastosGuardados = localStorage.getItem('gastos');
    if (gastosGuardados) {
        gastos = JSON.parse(gastosGuardados);
        mostrarGastos();
        calcularTotal();
    }
}


function agregarGasto() {
    const nombre = document.getElementById('nombre').value;
    const monto = parseFloat(document.getElementById('monto').value);

    if (nombre && !isNaN(monto)) {
        const gasto = {
            nombre: nombre,
            monto: monto
        };

        gastos.push(gasto);

        localStorage.setItem('gastos', JSON.stringify(gastos));

        document.getElementById('nombre').value = '';
        document.getElementById('monto').value = '';

        mostrarGastos();
        calcularTotal();
    } else {
        alert('Por favor, ingrese un nombre y un monto válido.');
    }
}

function mostrarGastos() {
    const listaGastos = document.getElementById('listaGastos');
    listaGastos.innerHTML = '';

    gastos.forEach(gasto => {
        const li = document.createElement('li');
        li.textContent = `${gasto.nombre}: $${gasto.monto}`;
        listaGastos.appendChild(li);
    });
}

function calcularTotal() {
    const total = gastos.reduce((sum, gasto) => sum + gasto.monto, 0);
    document.getElementById('totalGastos').textContent = `$${total}`;
}