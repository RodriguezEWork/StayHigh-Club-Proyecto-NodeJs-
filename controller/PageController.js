const { Cashbox } = require("../models/Cashbox");
const { Sale } = require("../models/Sale");
const { User } = require("../models/User");
const sequelize = require('sequelize');
const Op = sequelize.Op;
const literal = sequelize.literal;

const Dashboard = async (req, res) => {

    const cajas = await Cashbox.findAll({
        include: User
    });

    const topProduct = await Sale.findOne({
        attributes: [
            "name",
            [sequelize.fn("COUNT", sequelize.col("quantity")), "cantidad"],
        ],
        where: { 'ProductId': { [Op.ne]: null } },
        group: 'ProductId',
        order: [[sequelize.col('cantidad'), "DESC"]],
        raw: true
    });

    const topCombination = await Sale.findOne({
        attributes: [
            "name",
            [sequelize.fn("COUNT", sequelize.col("quantity")), "cantidad"],
        ],
        where: { 'CombinationId': { [Op.ne]: null } },
        group: 'CombinationId',
        order: [[sequelize.col('cantidad'), "DESC"]],
        raw: true
    });


    const topTicket = await Sale.findOne({
        attributes: [
            "name",
            [sequelize.fn("COUNT", sequelize.col("quantity")), "cantidad"],
        ],
        where: { 'TicketId': { [Op.ne]: null } },
        group: 'TicketId',
        order: [[sequelize.col('cantidad'), "DESC"]],
        raw: true
    });

    const topCaja = await Sale.findOne({
        attributes: [
            "name",
            [sequelize.fn("COUNT", sequelize.col("quantity")), "cantidad"],
        ],
        group: 'CashboxId',
        order: [[sequelize.col('cantidad'), "DESC"]],
        include: Cashbox,
    });

    const char2 = await Sale.findAll({
        order: [["createdAt", "DESC"]],
        limit: 7,
        raw: true
    });

    return res.render('admin/index', { cajas: cajas, topProduct, topCaja, topCombination, topTicket, char2, user: req.user });
}

module.exports = {
    Dashboard,
}