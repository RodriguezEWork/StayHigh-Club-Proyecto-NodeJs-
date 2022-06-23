$(document).ready(function () {

    $('input[type="radio"]').click(function () {
        var inputValue = $(this).attr("value");
        var targetBox = $("." + inputValue);
        $(".divBox").not(targetBox).hide();
        $(targetBox).show();
    });

    $('#ProductSelect').on('change', function () {
        let value = $(this).find(":selected").attr('stock');
        $('#StockProduct').val('');
        $('#StockProduct').attr('max', value);
    });

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
        stock = $.trim(parseInt(fila.find('td:eq(2)').text()));
        productId = $.trim($('#ProductId-' + id).val());
        combinationId = $.trim($('#CombinationId-' + id).val());

        $('#id').val(id);
        if (productId != '') {
            $("input[value='Product']").prop("checked", true);
            $('.divBox').not('Product').hide();
            $('.Product').show();
            $('#ProductSelect').val(productId);
            let value = $(`#ProductSelect option[value="${productId}"]`).attr('stock');
            $('#StockProduct').val(stock).attr('max', value);
        } else {
            $("input[value='Combination']").prop("checked", true);
            $('.divBox').not('Combination').hide();
            $('.Combination').show();
            $('#CombinationSelect').val(combinationId);
            $('#StockCombination').val(stock);
        }

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
                url: "/admin/products-cashbox-delete",
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

        let producto;
        let combinacion;
        let stock;

        if ($('#radioProducto').is(":checked")) {
            producto = $(`#ProductSelect`).val();
            stock = $('#StockProduct').val();
            combinacion = null;
        } else {
            combinacion = $(`#CombinationSelect`).val();
            stock = $('#StockCombination').val();
            producto = null;
        }

        const postData = {
            stock_inbox: stock,
            CashboxId: $('#cashboxId').val(),
            ProductId: producto,
            CombinationId: combinacion
        }

        if (opcion == 1) {
            $.post('/admin/products-cashbox-create', postData, function (response) {
                tablaPersonas.row.add([
                    response.boxProduct.id,
                    (response.boxProduct.ProductId) ? response.boxProduct.ProductId : response.boxProduct.CombinationId,
                    response.boxProduct.stock_inbox,
                ]).draw();
                $('#ProductId-' + response.boxProduct.id).val(response.boxProduct.ProductId);
                $('#CombinationId-' + response.boxProduct.id).val(response.boxProduct.ProductId);
                alerta(response.status, response.message);
            })
            e.preventDefault();
        } else if (opcion == 2) {
            postData.id = $.trim($("#id").val());
            $.post('/admin/products-cashbox-update', postData, function (response) {
                tablaPersonas.row(fila).data([
                    response.boxProduct.id,
                    (response.boxProduct.ProductId) ? response.boxProduct.ProductId : response.boxProduct.CombinationId,
                    response.boxProduct.stock_inbox,
                ]).draw();
                $('#ProductId-' + response.boxProduct.id).val(response.boxProduct.ProductId);
                $('#CombinationId-' + response.boxProduct.id).val(response.boxProduct.ProductId);
                alerta(response.status, response.message);
            })
            e.preventDefault();
        }

        $("#modalCRUD").modal("hide");

    });

});
