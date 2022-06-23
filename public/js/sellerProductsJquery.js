$(document).ready(function () {

    cargarProductos();

    function cargarProductos() {
        let template = '';
        $.get('/seller-products/showProducts', function (response) {
            response.products.forEach(item => {
                template +=
                    `<div class="thumb-wrapper">
                    <div class="img-box">
                        <img src="${(item.Product?.photo) ? item.Product.photo : item.Combination.photo}" class="img-fluid" alt="">									
                    </div>
                    <div class="thumb-content">
                        <h4>${(item.Product?.name) ? item.Product.name : item.Combination.name}</h4>									
                        <p class="item-stock" valor="${item.stock_inbox}" >Stock disponible: ${item.stock_inbox} </p>
                        <p class="item-price"  valor="${(item.Product?.sale_price) ? item.Product.sale_price : item.Combination.sale_price}" ><b>$${(item.Product?.sale_price) ? item.Product.sale_price : item.Combination.sale_price}</b></p>
                        <p class="item-extras" deadline="${(item.Product?.quantity_time_validated) ? item.Product.quantity_time_validated : item.Combination.quantity_time_validated}" type="${(item.Product?.type_date) ? item.Product.type_date : item.Combination.type_date}" cashbox="${usuario}" productid="${item.ProductId}" combinationid="${item.CombinationId}" ticketid="" tablaId="${item.id}" style="display: none;"></p>
                        <a href="#" class="btn btn-primary sellButton">Vender Producto</a>
                    </div>						
                </div>`
            })
            $('#sellerSection').html(template);
        });
    };

    $('#search').keyup(function (e) {

        if ($('#search').val()) {

            const id = {
                id: $('#search').val(),
            };

            $.post('/seller-products/searchProducts', id, function (response) {
                let template = '';
                response.products.forEach(item => {

                    template +=
                        `<div class="thumb-wrapper">
                <div class="img-box">
                    <img src="https://i.picsum.photos/id/367/200/300.jpg?blur=2&hmac=spqhhJdb-0X53e1tJ1NPGTJcnqGbaHkM4_qVLfCfchA" class="img-fluid" alt="">									
                </div>
                <div class="thumb-content">
                    <h4>${(item.Product?.name) ? item.Product.name : item.Combination.name}</h4>									
                    <p class="item-stock" valor="${item.stock_inbox}" >Stock disponible: ${item.stock_inbox} </p>
                    <p class="item-price"  valor="${(item.Product?.sale_price) ? item.Product.sale_price : item.Combination.sale_price}" ><b>$${(item.Product?.sale_price) ? item.Product.sale_price : item.Combination.sale_price}</b></p>
                    <p class="item-extras" deadline="${(item.Product?.quantity_time_validated) ? item.Product.quantity_time_validated : item.Combination.quantity_time_validated}" type="${(item.Product?.type_date) ? item.Product.type_date : item.Combination.type_date}" cashbox="${usuario}" productid="${item.ProductId}" combinationid="${item.CombinationId}" ticketid="" tablaId="${item.id}" style="display: none;"></p>
                    <a href="#" class="btn btn-primary sellButton">Vender Producto</a>
                </div>						
            </div>`
                });

                $('#sellerSection').html(template);
            })

        } else {
            cargarProductos();
        }



    });

    $(document).on('click', '.sellButton', function (e) {
        event.preventDefault();
        let base = this.closest('.thumb-content');
        let name = base.querySelector('h4').innerText;
        let stock = base.querySelector('.item-stock').getAttribute('valor');
        let price = base.querySelector('.item-price').getAttribute('valor');
        let deadline = base.querySelector('.item-extras').getAttribute('deadline');
        let tipo = base.querySelector('.item-extras').getAttribute('type');
        let cashbox = base.querySelector('.item-extras').getAttribute('cashbox');
        let productid = base.querySelector('.item-extras').getAttribute('productid');
        let combinationid = base.querySelector('.item-extras').getAttribute('combinationid');
        let ticketid = base.querySelector('.item-extras').getAttribute('ticketid');
        let id = base.querySelector('.item-extras').getAttribute('tablaId');

        let today = new Date();
        if (tipo == 'semana') {
            today.setDate(today.getDate() + (deadline * 7));
        } else {
            today.setMonth(today.getMonth() + deadline);
        }

        ticket_deadline = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()

        const postData = {
            id,
            name,
            stock,
            ticket_deadline,
            cashbox,
            productid,
            combinationid,
        }

        $.post('/seller-products/saleProducts', postData, function (response) {
            alerta(response.status, response.message);
            cargarProductos();
        })
    })

});

function alerta(status, message) {

    let template = $('#mostrar-alert').html();
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