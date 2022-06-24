const { Product } = require("../../models/Product");
const { Product_Combination } = require("../../models/product_combination");

const indexProductCombination = async (req, res) => {

    const { id } = req.params;

    const productsCombination = await Product_Combination.findAll({
        where: { CombinationId: id },
        include: Product
    });

    const productos = await Product.findAll();

    res.render('admin/produc-combinations', { productsCombination: productsCombination, combinationid: id, productos: productos, user: req.user })
}

const createProductCombination = async (req, res) => {

    try {
        const { amount_used, amount_preparations, ProductId, CombinationId } = req.body;

        const productsCombination = await Product_Combination.create({
            amount_used, amount_preparations, ProductId, CombinationId
        });

        res.status(200).json({ status: 'success-alert', message: "Se agrego a la combinación correctamente", productsCombination })
    } catch (error) {
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

const updateProductCombination = async (req, res) => {

    try {
        const { id, amount_used, amount_preparations, ProductId, CombinationId } = req.body;

        const productsCombination = await Product_Combination.findOne({
            where: { id },
        })

        productsCombination.set(req.body);
        await productsCombination.save();

        res.status(200).json({ status: 'success-alert', message: "Se actualizo el producto correctamente", productsCombination })
    } catch (error) {
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

const deleteProductCombination = async (req, res) => {

    try {

        const { id } = req.body;

        await Product_Combination.destroy({
            where: { id },
        });

        res.status(200).json({ message: "Successfully Registered" })
    } catch (error) {
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

module.exports = {
    indexProductCombination,
    createProductCombination,
    updateProductCombination,
    deleteProductCombination
}