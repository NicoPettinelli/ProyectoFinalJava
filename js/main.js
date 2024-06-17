let gastos = [];

function cargarGastos() {
    const gastosGuardados = localStorage.getItem('gastos');
    if (gastosGuardados) {
        gastos = JSON.parse(gastosGuardados);
    }
}

function guardarGastos() {
    localStorage.setItem('gastos', JSON.stringify(gastos));
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

        guardarGastos();

        document.getElementById('nombre').value = '';
        document.getElementById('monto').value = '';

        Swal.fire({
            text: "Gasto agregado correctamente!",
            icon: "success"
          });
    } else {
        Swal.fire({
            text: "Por favor, ingrese un nombre y un monto válido.",
            icon: "error"
          });
    }
}

function mostrarGastos() {
    cargarGastos();
    const listaGastos = document.getElementById('listaGastos');
    listaGastos.innerHTML = '';

    gastos.forEach(gasto => {
        const li = document.createElement('li');
        li.textContent = `${gasto.nombre}: $${gasto.monto.toFixed(2)}`;
        listaGastos.appendChild(li);
    });
}

function calcularTotal() {
    cargarGastos();
    const total = gastos.reduce((sum, gasto) => sum + gasto.monto, 0);
    document.getElementById('totalGastos').textContent = `$${total.toFixed(2)}`;
}

cargarGastos();