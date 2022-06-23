$(document).ready(function () {

    $("#btnNuevo").click(function () {
        $("#formPersonas").trigger("reset");
        $(".modal-header").css("background-color", "#1cc88a");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Nuevo Ticket");
        $("#modalCRUD").modal("show");
        id = null;
        opcion = 1; //alta
    });

    var fila; //capturar la fila para editar o borrar el registro

    //botón EDITAR    
    $(document).on("click", ".btnEditar", function () {
        fila = $(this).closest("tr");
        id = $.trim(parseInt(fila.find('td:eq(0)').text()));
        tipo = $.trim(fila.find('td:eq(1)').text());
        descipcion = $.trim(fila.find('td:eq(2)').text());
        precio = $.trim(parseInt(fila.find('td:eq(3)').text()));
        Stock = $.trim(fila.find('td:eq(4)').text());
        codigoQr = $.trim(fila.find('td:eq(5)').text());
        fechaLimite = $.trim((fila.find('td:eq(6)').text()));
        horaLimite = $.trim(fila.find('td:eq(7)').text());

        $('#id').val(id);
        $("#type").val(tipo);
        $("#description").val(descipcion);
        $("#price").val(precio);
        $("#stock").val(Stock);
        $("#qr_code").val(codigoQr);
        $("#valid_date").val(fechaLimite);
        $("#valid_time").val(horaLimite);
        opcion = 2; //editar

        $(".modal-header").css("background-color", "#4e73df");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Ticket");
        $("#modalCRUD").modal("show");

    });

    //botón BORRAR
    $(document).on("click", ".btnBorrar", function () {
        fila = $(this);
        id = parseInt($(this).closest("tr").find('td:eq(0)').text());
        var respuesta = confirm("¿Está seguro de eliminar el registro: " + id + "?");
        if (respuesta) {
            $.ajax({
                url: "/admin/tickets-delete",
                type: "POST",
                dataType: "json",
                data: { id: id },
                success: function () {
                    tablaPersonas.row(fila.parents('tr')).remove().draw();
                }
            });
        }
    });

    $("#formPersonas").submit(function (e) {
        e.preventDefault();

        const postData = {
            type: $.trim($("#type").val()),
            description: $.trim($("#description").val()),
            price: $.trim($("#price").val()),
            stock: $.trim($("#stock").val()),
            qr_code: $.trim($("#qr_code").val()),
            valid_date: $.trim($("#valid_date").val()),
            valid_time: $.trim($("#valid_time").val()),
        }

        if (opcion == 1) {
            $.post('/admin/tickets-create', postData, function (response) {
                tablaPersonas.row.add([
                    response.ticket.id,
                    response.ticket.type,
                    response.ticket.description,
                    response.ticket.price,
                    response.ticket.stock,
                    response.ticket.qr_code,
                    response.ticket.valid_date,
                    response.ticket.valid_time
                ]).draw();
                alerta(response.status, response.message);
            })
            e.preventDefault();
        } else if (opcion == 2) {
            postData.id = $.trim($("#id").val());
            $.post('/admin/tickets-update', postData, function (response) {
                tablaPersonas.row(fila).data([
                    response.ticket.id,
                    response.ticket.type,
                    response.ticket.description,
                    response.ticket.price,
                    response.ticket.stock,
                    response.ticket.qr_code,
                    response.ticket.valid_date,
                    response.ticket.valid_time
                ]).draw();
                alerta(response.status, response.message);
            })
            e.preventDefault();
        }

        $("#modalCRUD").modal("hide");

    });

});