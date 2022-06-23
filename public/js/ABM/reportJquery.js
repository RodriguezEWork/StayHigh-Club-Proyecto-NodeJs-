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

    $("#filtroDate").submit(function (e) {
        e.preventDefault();

        const postData = {
            date1: $.trim($("#dateStart").val()),
            date2: $.trim($("#dateEnd").val()),
        }

        $.post('/admin/reporte-filter', postData, function (response) {
            let tabla = document.getElementById('tbody');
            tabla.innerHTML = "";
            response.sale.forEach((item) => {
                let tr = document.createElement('tr');
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                td1.innerHTML = item.name;
                td2.innerHTML = item.quantity;
                if (item.Product.id > 0) {
                    td3.innerHTML = '$' + (item.Product.sale_price).toFixed(2).padStart(5, '0');
                    td4.innerHTML = '$' + (item.quantity * item.Product.sale_price).toFixed(2).padStart(5, '0');
                } else if (item.Combination.id > 0) {
                    td3.innerHTML = '$' + (item.Combination.sale_price).toFixed(2).padStart(5, '0');
                    td4.innerHTML = '$' + (item.quantity * item.Combination.sale_price).toFixed(2).padStart(5, '0');
                }
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tabla.appendChild(tr);
            });
            alerta(response.status, response.message);
        })
        e.preventDefault();


    });

});

function alerta(status, message) {

    let template =
        `<div class="alert ${status}">
        <h3>${message}</h3>
        <a class="close" onClick="fadeout(this)">&times;</a>
    </div>`
    $('#mostrar-alert').html(template);
};

function fadeout(parent) {
    $(parent)
        .parent(".alert")
        .fadeOut();
};