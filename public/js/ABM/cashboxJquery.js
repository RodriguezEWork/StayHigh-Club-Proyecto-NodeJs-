$(document).ready(function () {

    $("#btnNuevo").click(function () {
        $("#formPersonas").trigger("reset");
        $(".modal-header").css("background-color", "#1cc88a");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Nueva Caja");
        $("#modalCRUD").modal("show");
        id = null;
        opcion = 1; //alta
    });

    var fila; //capturar la fila para editar o borrar el registro

    //botón EDITAR    
    $(document).on("click", ".btnEditar", function () {
        fila = $(this).closest("tr");
        id = $.trim(parseInt(fila.find('td:eq(0)').text()));
        nombre = $.trim(fila.find('td:eq(1)').text());
        type = $.trim(fila.find('td:eq(2)').text());
        plataInicial = $.trim(parseInt(fila.find('td:eq(3)').text()));
        plata = $.trim(parseInt(fila.find('td:eq(4)').text()));
        usuario = $.trim($('#useruse-' + id).val());

        $('#id').val(id);
        $("#name").val(nombre);
        $("#type").val(type);
        $("#initial_money").val(plataInicial);
        $("#money").val(plata);
        $("#UserId").val(usuario);
        opcion = 2; //editar

        $(".modal-header").css("background-color", "#4e73df");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Caja");
        $("#modalCRUD").modal("show");

    });

    //botón BORRAR
    $(document).on("click", ".btnBorrar", function () {
        fila = $(this);
        id = parseInt($(this).closest("tr").find('td:eq(0)').text());
        var respuesta = confirm("¿Está seguro de eliminar el registro: " + id + "?");
        if (respuesta) {
            $.ajax({
                url: "/admin/cashbox-delete",
                type: "POST",
                dataType: "json",
                data: { id: id },
                success: function (response) {
                    tablaPersonas.row(fila.parents('tr')).remove().draw();
                    alerta(response.status, response.message);
                }
            });
        }
    });

    $("#formPersonas").submit(function (e) {
        e.preventDefault();

        const postData = {
            name: $.trim($("#name").val()),
            type: $.trim($("#type").val()),
            initial_money: $.trim($("#initial_money").val()),
            money: $.trim($("#money").val()),
            UserId: $.trim($("#UserId").val()),
        }

        if (opcion == 1) {
            $.post('/admin/cashbox-create', postData, function (response) {
                tablaPersonas.row.add([
                    response.cashbox.id,
                    response.cashbox.name,
                    response.cashbox.type,
                    response.cashbox.initial_money,
                    response.cashbox.money,
                    response.cashbox.UserId,
                    `<div class='text-center'><div class='btn-group'><a class='btn btn-primary' href='/admin/products-cashbox/${response.cashbox.id}'>Productos</a>`
                ]).draw();
                $('#useruse-' + response.cashbox.id).val(response.cashbox.UserId)
                alerta(response.status, response.message);
            })
            e.preventDefault();
        } else if (opcion == 2) {
            postData.id = $.trim($("#id").val());
            $.post('/admin/cashbox-update', postData, function (response) {
                tablaPersonas.row(fila).data([
                    response.cashbox.id,
                    response.cashbox.name,
                    response.cashbox.type,
                    response.cashbox.initial_money,
                    response.cashbox.money,
                    response.cashbox.UserId,
                    `<div class='text-center'><div class='btn-group'><a class='btn btn-primary' href='/admin/products-cashbox/${response.cashbox.id}'>Productos</a>`
                ]).draw();
                $('#useruse-' + response.cashbox.id).val(response.cashbox.UserId)
                alerta(response.status, response.message);
            })
            e.preventDefault();
        }

        $("#modalCRUD").modal("hide");

    });

});
