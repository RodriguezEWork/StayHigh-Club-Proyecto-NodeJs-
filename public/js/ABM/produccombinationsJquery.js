$(document).ready(function () {

    $("#btnNuevo").click(function () {
        $("#formPersonas").trigger("reset");
        $(".modal-header").css("background-color", "#1cc88a");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Nuevo producto para la combinación");
        $("#modalCRUD").modal("show");
        id = null;
        opcion = 1; //alta
    });

    var fila; //capturar la fila para editar o borrar el registro

    //botón EDITAR    
    $(document).on("click", ".btnEditar", function () {
        fila = $(this).closest("tr");
        id = $.trim(parseInt(fila.find('td:eq(0)').text()));
        cantidad = $.trim(parseInt(fila.find('td:eq(2)').text()));
        porciones = $.trim(parseInt(fila.find('td:eq(3)').text()));
        productId = $.trim($('#ProductId-' + id).val());

        $('#id').val(id);
        $("#ProductId").val(productId);
        $("#amount_used").val(cantidad);
        $("#amount_preparations").val(porciones);
        opcion = 2; //editar

        $(".modal-header").css("background-color", "#4e73df");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar producto de la combinación");
        $("#modalCRUD").modal("show");

    });

    //botón BORRAR
    $(document).on("click", ".btnBorrar", function () {
        fila = $(this);
        id = parseInt($(this).closest("tr").find('td:eq(0)').text());
        var respuesta = confirm("¿Está seguro de eliminar el registro: " + id + "?");
        if (respuesta) {
            $.ajax({
                url: "/admin/products-combination-delete",
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
            amount_used: $("#amount_used").val(),
            amount_preparations: $("#amount_preparations").val(),
            ProductId: $("#ProductId").val(),
            CombinationId: $("#combinationid").val(),
        }

        if (opcion == 1) {
            $.post('/admin/products-combination-create', postData, function (response) {
                tablaPersonas.row.add([
                    response.productsCombination.id,
                    response.productsCombination.ProductId,
                    response.productsCombination.amount_used,
                    response.productsCombination.amount_preparations,
                ]).draw();
                $('#ProductId-' + response.productsCombination.id).val(response.productsCombination.ProductId);
                alerta(response.status, response.message);
            })
            e.preventDefault();
        } else if (opcion == 2) {
            postData.id = $.trim($("#id").val());
            $.post('/admin/products-combination-update', postData, function (response) {
                tablaPersonas.row(fila).data([
                    response.productsCombination.id,
                    response.productsCombination.ProductId,
                    response.productsCombination.amount_used,
                    response.productsCombination.amount_preparations,
                ]).draw();
                $('#ProductId-' + response.productsCombination.id).val(response.productsCombination.ProductId);
                alerta(response.status, response.message);
            })
            e.preventDefault();
        }

        $("#modalCRUD").modal("hide");

    });

});
