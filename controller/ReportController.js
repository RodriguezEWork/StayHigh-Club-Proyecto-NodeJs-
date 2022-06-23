const { Sale } = require("../models/Sale");
const { Product } = require("../models/Product");
const { Combination } = require("../models/Combination");
const sequelize = require('sequelize');
const Op = sequelize.Op;

const indexReport = async (req, res) => {
    const sale = await Sale.findAll({
        attributes: [
            "name",
            [sequelize.fn("SUM", sequelize.col("quantity")), "quantity"]
        ],
        group: 'name',
        include: [Product, Combination],
    });

    res.render('admin/reportes', { sale: sale, user: req.user });
}

const filterReport = async (req, res) => {

    try {

        const { date1, date2 } = req.body;

        const sale = await Sale.findAll({
            where: {
                'createdAt': {
                    [Op.between]: [new Date(date1), new Date(date2)]
                }
            },
            include: [Product, Combination]
        })

        res.status(200).json({ status: 'success-alert', message: "Se filtro correctamente", sale })
    } catch (error) {
        res.status(200).json({ status: 'danger-alert', message: "No se pudo realizar la accion" })
    }

}

module.exports = {
    indexReport,
    filterReport
}