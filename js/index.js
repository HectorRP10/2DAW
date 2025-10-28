const datos = [
    {nombre: "Juan", apellidos: "Pérez", email: "juan@gmail.com", telefono: "123456789", curso: "2DAW", sexo: "M"},
    {nombre: "Ana", apellidos: "Gómez", email: "ana@gmail.com", telefono: "987654321", curso: "1DAW", sexo: "F"},
    {nombre: "Luis", apellidos: "Martínez", email: "luis@gmail.com", telefono: "456123789", curso: "2DAW", sexo: "M"},
    {nombre: "Marta", apellidos: "López", email: "marta@gmail.com", telefono: "321654987", curso: "1DAW", sexo: "F"},
    {nombre: "Carlos", apellidos: "Sánchez", email: "carlos@gmail.com", telefono: "789456123", curso: "2DAW", sexo: "M"},
    {nombre: "Laura", apellidos: "Fernández", email: "laura@gmail.com", telefono: "159753486", curso: "1DAW", sexo: "F"}
];

const tbody = document.querySelector("tbody");
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
        </td>
    `;
    tbody.appendChild(fila);
     
    const btnEliminar = fila.querySelector(".btnEliminar");
    btnEliminar.addEventListener("click", () => {
        fila.remove();
    });
});

document.querySelector(".filtro").addEventListener("input", function() {
    const filtro = this.value.toLowerCase();
    if(filtro.length < 3){
        const filas = tbody.querySelectorAll("tr");
        filas.forEach(fila => fila.style.display = "");
        return;
    }

    const filas = tbody.querySelectorAll("tr");
    filas.forEach(fila => {
        const nombre = fila.children[0].textContent.toLowerCase();
        const apellidos = fila.children[1].textContent.toLowerCase();
        fila.style.display = (nombre.includes(filtro) || apellidos.includes(filtro)) ? "" : "none";

    });
});