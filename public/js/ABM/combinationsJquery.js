$(document).ready(function () {

    $("#btnNuevo").click(function () {
        $("#formPersonas").trigger("reset");
        $('#password').removeAttr('readonly', 'readonly');
        $(".modal-header").css("background-color", "#1cc88a");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Nueva Combinación");
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
        marca = $.trim(fila.find('td:eq(2)').text());
        precio = $.trim(parseInt(fila.find('td:eq(3)').text()));
        photo = $.trim(fila.find('td:eq(4)').text());
        tiempo = $.trim(parseInt(fila.find('td:eq(5)').text()));
        tipo = $.trim(fila.find('td:eq(6)').text());

        $('#id').val(id);
        $("#name").val(nombre);
        $("#band").val(marca);
        $("#sale_price").val(precio);
        $("#photo").val(photo);
        $("#quantity_time_validated").val(tiempo);
        $("#type_date").val(tipo);
        opcion = 2; //editar

        $(".modal-header").css("background-color", "#4e73df");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Combinación");
        $("#modalCRUD").modal("show");

    });

    //botón BORRAR
    $(document).on("click", ".btnBorrar", function () {
        fila = $(this);
        id = parseInt($(this).closest("tr").find('td:eq(0)').text());
        var respuesta = confirm("¿Está seguro de eliminar el registro: " + id + "?");
        if (respuesta) {
            $.ajax({
                url: "/admin/combinations-delete",
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
                url: '/admin/combinations-create',
                data: postData,
                cache: false,
                contentType: false,
                processData: false,
                method: 'POST',
                type: 'POST', // For jQuery < 1.9
                success: function (response) {
                    tablaPersonas.row.add([
                        response.combinations.id,
                        response.combinations.name,
                        response.combinations.band,
                        response.combinations.sale_price,
                        `<img src="/${response.combinations.photo}" width="50px" height="50px">`,
                        response.combinations.quantity_time_validated,
                        response.combinations.type_date,
                        `<div class='text-center'><div class='btn-group'><a class='btn btn-primary' href='/admin/products-combination/${response.combinations.id}'>Ingredientes</a>`
                    ]).draw();
                    alerta(response.status, response.message);
                }
            });
        } else if (opcion == 2) {
            jQuery.ajax({
                url: '/admin/combinations-update',
                data: postData,
                cache: false,
                contentType: false,
                processData: false,
                method: 'POST',
                type: 'POST', // For jQuery < 1.9
                success: function (response) {
                    tablaPersonas.row(fila).data([
                        response.combinations.id,
                        response.combinations.name,
                        response.combinations.band,
                        response.combinations.sale_price,
                        `<img src="/${response.combinations.photo}" width="50px" height="50px">`,
                        response.combinations.quantity_time_validated,
                        response.combinations.type_date,
                        `<div class='text-center'><div class='btn-group'><a class='btn btn-primary' href='/admin/products-combination/${response.combinations.id}'>Ingredientes</a>`
                    ]).draw();
                    alerta(response.status, response.message);
                }
            });
        }

        $("#modalCRUD").modal("hide");

    });

});
