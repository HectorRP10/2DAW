async function enviarFormulario(e) {
    e.preventDefault();

    const confirm = await Swal.fire({
        title: "¿Crear usuario?",
        text: "Se creará un nuevo usuario con los datos introducidos.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#5aa270",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Crear",
        cancelButtonText: "Cancelar"
    });

    if (!confirm.isConfirmed) return;

    const formData = new FormData(e.target);

    try {
        const response = await fetch("ws/crearUsuario.php", {
            method: "POST",
            body: formData
        });
        const json = await response.json();

        if (json.success) {
            Swal.fire({
                icon: "success",
                title: "Usuario creado",
                text: json.message,
                confirmButtonColor: "#5aa270"
            }).then(() => {
                e.target.reset();
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: json.message,
                confirmButtonColor: "#5aa270"
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error de red",
            text: error.message,
            confirmButtonColor: "#5aa270"
        });
    }
}
