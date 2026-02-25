let indiceEditar = null;
let datos = [];
const tbody = document.querySelector("tbody");

async function getUsuarios() {
    try {
        const response = await fetch("ws/getUsuario.php");
        const json = await response.json();

        if (json.success) {
            datos = json.data;
            mostrarDatos(datos);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function mostrarDatos(datos) {
    tbody.innerHTML = "";

    datos.forEach(dato => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${dato.nombre}</td>
            <td>${dato.apellidos}</td>
            <td>${dato.email}</td>
            <td>${dato.telefono}</td>
            <td>${dato.fecha_nacimiento}</td>
            <td>${dato.sexo}</td>
            <td>
                <button class="btnEliminar" onclick="eliminarUsuario(${dato.id}, '${dato.nombre}', '${dato.apellidos}')">Eliminar</button>
                <button class="btnEditar" onclick="editarUsuario(${datos.indexOf(dato)})">Editar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

async function eliminarUsuario(id, nombre, apellidos) {
    const confirm = await Swal.fire({
        title: "¿Eliminar usuario?",
        text: `Se eliminará a ${nombre} ${apellidos} de forma permanente.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    });

    if (!confirm.isConfirmed) return;

    try {
        const response = await fetch(`ws/deleteUsuario.php?id=${id}`);
        const json = await response.json();

        if (json.success) {
            await getUsuarios();
            Swal.fire({ icon: "success", title: "Eliminado", text: json.message, confirmButtonColor: "#5aa270" });
        } else {
            Swal.fire({ icon: "error", title: "Error", text: json.message });
        }
    } catch (error) {
        Swal.fire({ icon: "error", title: "Error de red", text: error.message });
    }
}

async function editarUsuario(indice) {
    const dato = datos[indice];

    const confirm = await Swal.fire({
        title: "¿Editar usuario?",
        text: `Vas a editar a ${dato.nombre} ${dato.apellidos}.`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Sí, editar",
        cancelButtonText: "Cancelar"
    });

    if (!confirm.isConfirmed) return;

    indiceEditar = indice;

    document.getElementById("nombre").value = dato.nombre;
    document.getElementById("apellidos").value = dato.apellidos;
    document.getElementById("email").value = dato.email;
    document.getElementById("telefono").value = dato.telefono;
    document.getElementById("fecha_nacimiento").value = dato.fecha_nacimiento;
    document.getElementById("sexo").value = dato.sexo;

    document.getElementById("formEditar").style.display = "block";
}

async function guardarUsuario() {
    if (indiceEditar === null) return;

    const id = datos[indiceEditar].id;

    const formData = new FormData();
    formData.append("nombre", document.getElementById("nombre").value);
    formData.append("apellidos", document.getElementById("apellidos").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("telefono", document.getElementById("telefono").value);
    formData.append("fecha_nacimiento", document.getElementById("fecha_nacimiento").value);
    formData.append("sexo", document.getElementById("sexo").value);

    try {
        const response = await fetch(`ws/modificarUsuario.php?id=${id}`, {
            method: "POST",
            body: formData
        });
        const json = await response.json();

        if (json.success) {
            document.getElementById("formEditar").style.display = "none";
            indiceEditar = null;
            await getUsuarios();
            Swal.fire({ icon: "success", title: "Guardado", text: json.message, confirmButtonColor: "#5aa270" });
        } else {
            Swal.fire({ icon: "error", title: "Error", text: json.message });
        }
    } catch (error) {
        Swal.fire({ icon: "error", title: "Error de red", text: error.message });
    }
}

// Filtro de tabla
document.querySelector(".filtro").addEventListener("input", function () {
    const filtro = this.value.toLowerCase();
    const filas = tbody.querySelectorAll("tr");

    filas.forEach(fila => {
        const nombre = fila.children[0].textContent.toLowerCase();
        const apellidos = fila.children[1].textContent.toLowerCase();

        fila.style.display = (filtro.length < 3 || nombre.includes(filtro) || apellidos.includes(filtro)) ? "" : "none";
    });
});

getUsuarios();