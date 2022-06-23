const { Box_Product } = require("../../models/box_product");
const { Combination } = require("../../models/Combination");
const { Product } = require("../../models/Product");
const { Product_Combination } = require("../../models/product_Combination");

const indexProductBox = async (req, res) => {

    const { id } = req.params;

    const productsBox = await Box_Product.findAll({
        where: { CashboxId: id },
        include: [Product, Combination]
    });

    const productos = await Product.findAll();
    const combinations = await Combination.findAll();

    res.render('admin/produc-boxs', { productsBox: productsBox, cashboxId: id, productos: productos, combinations: combinations, user: req.user })
}

const createProductBox = async (req, res) => {

    try {
        const { stock_inbox, CashboxId, ProductId, CombinationId } = req.body;
        let combinacion;
        let producto;

        if (CombinationId == '') {
            combinacion = null;
            producto = ProductId;
        } else {
            combinacion = CombinationId;
            producto = null;
        }

        const boxProduct = await Box_Product.create({
            stock_inbox, CashboxId, ProductId: producto, CombinationId: combinacion
        });

        res.status(200).json({ status: 'success-alert', message: "Se agrego a la caja correctamente", boxProduct })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

const updateProductBox = async (req, res) => {

    try {
        const { id, stock_inbox, CashboxId, ProductId, CombinationId } = req.body;

        let combinacion;
        let producto;

        if (CombinationId == '') {
            combinacion = null;
            producto = ProductId;
        } else {
            combinacion = CombinationId;
            producto = null;
        }

        const boxProduct = await Box_Product.findOne({
            where: { id },
        })

        boxProduct.set({ id, stock_inbox, CashboxId, ProductId: producto, CombinationId: combinacion });
        await boxProduct.save();

        res.status(200).json({ status: 'success-alert', message: "Se actualizo el producto correctamente", boxProduct })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

const deleteProductBox = async (req, res) => {

    try {

        const { id } = req.body;

        await Box_Product.destroy({
            where: { id },
        });

        res.status(200).json({ status: 'warning-alert', message: "Se elimino el producto correctamente" })
    } catch (error) {
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

module.exports = {
    indexProductBox,
    createProductBox,
    updateProductBox,
    deleteProductBox
}