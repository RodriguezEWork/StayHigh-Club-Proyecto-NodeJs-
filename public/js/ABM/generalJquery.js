$(document).ready(function () {
    tablaPersonas = $("#tablaPersonas").DataTable({
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditar'>Editar</button><button class='btn btn-danger btnBorrar'>Borrar</button></div></div>"
        }],

        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando...",
        }
    });

});

function alerta(status, message) {

    let template = $('#mostrar-alert').html();
    console.log(template)
    template +=
        `<div class="alert ${status}">
        <h3>${message}</h3>
        <a class="close" onClick="fadeout(this)">&times;</a>
    </div>`
    $('#mostrar-alert').html(template);

    setTimeout(() => {
        $('#mostrar-alert').empty();
    }, 1500);
};

function fadeout(parent) {
    $(parent)
        .parent(".alert")
        .fadeOut();
};