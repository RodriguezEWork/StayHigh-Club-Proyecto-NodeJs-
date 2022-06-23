$(document).ready(function () {

    $("#btnNuevo").click(function () {
        $("#formPersonas").trigger("reset");
        $(".modal-header").css("background-color", "#1cc88a");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Nuevo Producto");
        $("#modalCRUD").modal("show");
        id = null;
        opcion = 1; //alta
    });

    var fila; //capturar la fila para editar o borrar el registro

    //botón EDITAR    
    $(document).on("click", ".btnEditar", function () {
        fila = $(this).closest("tr");
        id = parseInt(fila.find('td:eq(0)').text());
        nombre = fila.find('td:eq(1)').text();
        grupo = fila.find('td:eq(2)').text();
        stock = parseInt(fila.find('td:eq(3)').text());
        stockMinimo = parseInt(fila.find('td:eq(4)').text());
        precioCompra = parseInt(fila.find('td:eq(5)').text());
        precioVenta = parseInt(fila.find('td:eq(6)').text());
        tiempo = parseInt(fila.find('td:eq(7)').text());
        tipo = fila.find('td:eq(8)').text();

        $('#id').val(id);
        $("#name").val(nombre);
        $("#band").val(grupo);
        $("#stock").val(stock);
        $("#minimum_stock").val(stockMinimo);
        $("#purcharse_price").val(precioCompra);
        $("#sale_price").val(precioVenta);
        $("#quantity_time_validated").val(tiempo);
        $("#type_date").val(tipo);
        opcion = 2; //editar

        $(".modal-header").css("background-color", "#4e73df");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Producto");
        $("#modalCRUD").modal("show");

    });

    //botón BORRAR
    $(document).on("click", ".btnBorrar", function () {
        fila = $(this);
        id = parseInt($(this).closest("tr").find('td:eq(0)').text());
        var respuesta = confirm("¿Está seguro de eliminar el registro: " + id + "?");
        if (respuesta) {
            $.ajax({
                url: "/admin/products-delete",
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

        const postData = new FormData(e.currentTarget);

        if (opcion == 1) {
            jQuery.ajax({
                url: '/admin/products-create',
                data: postData,
                cache: false,
                contentType: false,
                processData: false,
                method: 'POST',
                type: 'POST', // For jQuery < 1.9
                success: function (response) {
                    tablaPersonas.row.add([response.product.id,
                    response.product.name,
                    response.product.band,
                    response.product.stock,
                    response.product.minimum_stock,
                    response.product.purcharse_price,
                    response.product.sale_price,
                    response.product.quantity_time_validated,
                    response.product.type_date]).draw();
                    alerta(response.status, response.message);
                }
            });
        } else if (opcion == 2) {
            jQuery.ajax({
                url: '/admin/products-update',
                data: postData,
                cache: false,
                contentType: false,
                processData: false,
                method: 'POST',
                type: 'POST', // For jQuery < 1.9
                success: function (response) {
                    tablaPersonas.row(fila).data([response.product.id,
                    response.product.name,
                    response.product.band,
                    response.product.stock,
                    response.product.minimum_stock,
                    response.product.purcharse_price,
                    response.product.sale_price,
                    response.product.quantity_time_validated,
                    response.product.type_date]).draw();
                    alerta(response.status, response.message);
                }
            });
        }

        $("#modalCRUD").modal("hide");

    });

});
