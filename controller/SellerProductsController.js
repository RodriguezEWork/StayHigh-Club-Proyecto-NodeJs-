const { Product } = require("../models/Product");
const { Combination } = require("../models/Combination");
const { Box_Product } = require("../models/box_product");
const { Sale } = require("../models/Sale");
const sequelize = require('sequelize');
const { Cashbox } = require("../models/Cashbox");
const Op = sequelize.Op;

const indexProducts = (req, res) => {
    res.render('sellerProducts/products', { user: req.user });
}

const showProducts = async (req, res) => {

    try {

        const products = await Box_Product.findAll({
            where: { CashboxId: req.user.cashbox },
            include: [Product, Combination]
        });

        res.status(200).json({ products })
    } catch (error) {
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

const searchProducts = async (req, res) => {


    try {
        const { id } = req.body;

        const products = await Box_Product.findAll({
            include: [Product, Combination],
            where: {
                [Op.or]: [
                    sequelize.literal(`Product.name like "%${id}%"`),
                    sequelize.literal(`Combination.name like "%${id}%"`)
                ]
            },
        });

        res.status(200).json({ products })
    } catch (error) {
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

const saleProducts = async (req, res) => {

    try {

        const { id, name, stock, ticket_deadline, cashbox, productid, combinationid } = req.body;

        if (combinationid != 'null') {
            await Sale.create({
                type: 'Venta_trago',
                quantity: 1,
                operation: 'Venta',
                name: name,
                ticket_deadline: ticket_deadline,
                CashboxId: cashbox,
                CombinationId: combinationid,
            });
        } else if (productid != 'null') {
            await Sale.create({
                type: 'Venta_producto',
                quantity: 1,
                operation: 'Venta',
                name: name,
                ticket_deadline: ticket_deadline,
                CashboxId: cashbox,
                ProductId: productid,
            });
        }

        const box = await Box_Product.findOne({
            attributes: ['stock_inbox'],
            where: { id },
            include: [Product, Combination]
        })

        const caja = await Cashbox.findByPk(cashbox);

        let newMoney;

        if (box.Product?.sale_price) {
            newMoney = box.Product.sale_price + caja.money;
        } else {
            newMoney = box.Combination.sale_price + caja.money;
        }

        caja.set({ id: cashbox, money: newMoney });
        await caja.save();

        box.set({ id: id, stock_inbox: (stock - 1) });
        await box.save();

        res.status(200).json({ status: 'success-alert', message: "Se vendio correctamente", nuevoStock: (stock - 1) })
    } catch (error) {
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

const cashboxOperation = async (req, res) => {

    const operaciones = await Sale.findAll({
        where: {
            CashboxId: req.user.cashbox
        },
    })

    res.render('sellerProducts/operations', { operaciones, user: req.user });
}

const viewOperation = async (req, res) => {

}


const cancelOperation = async (req, res) => {
    try {

        const { id, cashbox, producto, combinacion } = req.body;

        await Sale.destroy({
            where: { id },
        })

        const box = await Box_Product.findOne({
            attributes: ['id', 'stock_inbox'],
            where: {
                [Op.and]: [
                    { CashboxId: cashbox },
                    {
                        [Op.or]: [
                            { CombinationId: combinacion },
                            { ProductId: producto }
                        ]
                    }
                ]
            },
            include: [Product, Combination]
        })

        const caja = await Cashbox.findByPk(cashbox);

        let newMoney;

        if (box.Product?.sale_price) {
            newMoney = caja.money - box.Product.sale_price;
        } else {
            newMoney = caja.money - box.Combination.sale_price;
        }

        caja.set({ id: cashbox, money: newMoney });
        await caja.save();

        const nuevoStock = (box.stock_inbox + 1)
        const nuevaId = box.id;

        box.set({ id: nuevaId, stock_inbox: nuevoStock });
        await box.save();

        res.status(200).json({ status: 'success-alert', message: "Se elimino correctamente" })
    } catch (error) {
        res.status(400).json({ message: "No se pudo realizar la accion" })
        console.log(error)
    }
}

module.exports = {
    indexProducts,
    showProducts,
    searchProducts,
    saleProducts,
    cashboxOperation,
    viewOperation,
    cancelOperation
}