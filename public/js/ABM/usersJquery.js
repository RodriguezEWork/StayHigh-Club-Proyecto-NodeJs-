$(document).ready(function () {

    $("#btnNuevo").click(function () {
        $("#formPersonas").trigger("reset");
        $('#password').removeAttr('readonly', 'readonly');
        $(".modal-header").css("background-color", "#1cc88a");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Nuevo Usuario");
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
        email = $.trim(fila.find('td:eq(2)').text());
        estado = $.trim($('#estado-' + id).val());
        roleId = $.trim($('#RoleId-' + id).val());

        $('#id').val(id);
        $("#name").val(nombre);
        $("#email").val(email);
        $("#confirmAccount").val(estado);
        $("#RoleId").val(roleId);
        $('#password').attr('readonly', 'readonly');
        opcion = 2; //editar

        $(".modal-header").css("background-color", "#4e73df");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Usuario");
        $("#modalCRUD").modal("show");

    });

    //botón BORRAR
    $(document).on("click", ".btnBorrar", function () {
        fila = $(this);
        id = parseInt($(this).closest("tr").find('td:eq(0)').text());
        var respuesta = confirm("¿Está seguro de eliminar el registro: " + id + "?");
        if (respuesta) {
            $.ajax({
                url: "/admin/users-delete",
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
            email: $.trim($("#email").val()),
            confirmAccount: $.trim($("#confirmAccount").val()),
            RoleId: $.trim($("#RoleId").val()),
        }

        if (opcion == 1) {
            postData.password = $.trim($("#password").val()),
                $.post('/admin/users-create', postData, function (response) {
                    tablaPersonas.row.add([
                        response.users.id,
                        response.users.name,
                        response.users.email,
                        response.users.confirmAccount,
                        response.users.RoleId,
                    ]).draw();
                    $.trim($('#estado-' + response.users.id).val(response.users.confirmAccount));
                    $.trim($('#RoleId-' + response.users.id).val(response.users.RoleId));
                    alerta(response.status, response.message);
                })
            e.preventDefault();
        } else if (opcion == 2) {
            postData.id = $.trim($("#id").val());
            $.post('/admin/users-update', postData, function (response) {
                tablaPersonas.row(fila).data([
                    response.users.id,
                    response.users.name,
                    response.users.email,
                    response.users.confirmAccount,
                    response.users.RoleId,
                ]).draw();
                $.trim($('#estado-' + response.users.id).val(response.users.confirmAccount));
                $.trim($('#RoleId-' + response.users.id).val(response.users.RoleId));
                alerta(response.status, response.message);
            })
            e.preventDefault();
        }

        $("#modalCRUD").modal("hide");

    });

});
