const datos = [
    {nombre: "Juan", apellidos: "Pérez", email: "juan@gmail.com", telefono: "123456789", curso: "2DAW", sexo: "M"},
    {nombre: "Ana", apellidos: "Gómez", email: "ana@gmail.com", telefono: "987654321", curso: "1DAW", sexo: "F"},
    {nombre: "Luis", apellidos: "Martínez", email: "luis@gmail.com", telefono: "456123789", curso: "2DAW", sexo: "M"},
    {nombre: "Marta", apellidos: "López", email: "marta@gmail.com", telefono: "321654987", curso: "1DAW", sexo: "F"},
    {nombre: "Carlos", apellidos: "Sánchez", email: "carlos@gmail.com", telefono: "789456123", curso: "2DAW", sexo: "M"},
    {nombre: "Laura", apellidos: "Fernández", email: "laura@gmail.com", telefono: "159753486", curso: "1DAW", sexo: "F"}
];

let indiceEditar = null;
const tbody = document.querySelector("tbody");

function mostrarDatos() {
    tbody.innerHTML = "";

    datos.forEach(dato => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${dato.nombre}</td>
            <td>${dato.apellidos}</td>
            <td>${dato.email}</td>
            <td>${dato.telefono}</td>
            <td>${dato.curso}</td>
            <td>${dato.sexo}</td>
            <td>
                <button class="btnEliminar">Eliminar</button>
                <button class="btnEditar">Editar</button>
            </td>
        `;
        tbody.appendChild(fila);

        // Botón Eliminar
        fila.querySelector(".btnEliminar").addEventListener("click", () => {
            datos.splice(datos.indexOf(dato), 1);
            mostrarDatos();
        });

        // Botón Editar
        fila.querySelector(".btnEditar").addEventListener("click", () => {
            indiceEditar = datos.indexOf(dato);

            document.getElementById("nombre").value = dato.nombre;
            document.getElementById("apellidos").value = dato.apellidos;
            document.getElementById("email").value = dato.email;
            document.getElementById("telefono").value = dato.telefono;
            document.getElementById("curso").value = dato.curso;
            document.getElementById("sexo").value = dato.sexo;

            document.getElementById("formEditar").style.display = "block";
        });
    });
}

// Evento botón Guardar
document.getElementById("btnGuardar").addEventListener("click", () => {
    if (indiceEditar === null) return;

    datos[indiceEditar].nombre = document.getElementById("nombre").value;
    datos[indiceEditar].apellidos = document.getElementById("apellidos").value;
    datos[indiceEditar].email = document.getElementById("email").value;
    datos[indiceEditar].telefono = document.getElementById("telefono").value;
    datos[indiceEditar].curso = document.getElementById("curso").value;
    datos[indiceEditar].sexo = document.getElementById("sexo").value;

    document.getElementById("formEditar").style.display = "none";

    mostrarDatos();

    indiceEditar = null;
});

// Filtro de tabla
document.querySelector(".filtro").addEventListener("input", function() {
    const filtro = this.value.toLowerCase();
    const filas = tbody.querySelectorAll("tr");

    filas.forEach(fila => {
        const nombre = fila.children[0].textContent.toLowerCase();
        const apellidos = fila.children[1].textContent.toLowerCase();

        fila.style.display = (filtro.length < 3 || nombre.includes(filtro) || apellidos.includes(filtro)) ? "" : "none";
    });
});

mostrarDatos();