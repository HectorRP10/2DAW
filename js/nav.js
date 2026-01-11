window.onload = function () {

    var request = new XMLHttpRequest();
    request.open("GET", "nav.html", true);

    request.onload = function () {
        if (request.status === 200) {

            //Se añade el nav al inicio del body
            document.body.insertAdjacentHTML("afterbegin", request.responseText);

            //Se obtiene la ruta actual
            var rutaActual = window.location.pathname.split("/").pop();
            var enlaces = document.querySelectorAll("nav a");

            enlaces.forEach(function (enlace) {
                if (enlace.getAttribute("href") === rutaActual) {
                    enlace.classList.add("activo");
                }
            });
        }
    };

    request.send();
};