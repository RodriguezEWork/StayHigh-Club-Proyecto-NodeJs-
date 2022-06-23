$(document).ready(function () {
    tablaPersonas = $("#tablaPersonas").DataTable({
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

    //botón BORRAR
    $(document).on("click", ".btnBorrar", function () {
        fila = $(this);
        id = parseInt($(this).closest("tr").find('td:eq(0)').text());
        let producto = $(`#Producto-Id-${id}`).val();
        let combinacion = $(`#Combinacion-Id-${id}`).val();
        let cashbox = usuario;
        var respuesta = confirm("¿Está seguro de eliminar el registro: " + id + "?");

        if (respuesta) {
            $.ajax({
                url: '/seller-products/operations/delete',
                type: "POST",
                dataType: "json",
                data: { id: id, cashbox: cashbox, producto: producto, combinacion: combinacion },
                success: function (response) {
                    tablaPersonas.row(fila.parents('tr')).remove().draw();
                    alerta(response.status, response.message);
                }
            });
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