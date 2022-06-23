const { Cashbox } = require("../../models/Cashbox");
const { User } = require("../../models/User");
const { Box_Product } = require("../../models/box_product");
const { Sale } = require("../../models/Sale");

const indexCashbox = async (req, res) => {
    const cashboxes = await Cashbox.findAll({
        where: {
            status: 1
        },
        include: User,
    });
    const users = await User.findAll({
        where: {
            status: 1
        }
    });
    res.render('admin/cashboxes', { cashboxes: cashboxes, users: users, user: req.user })
}

const createCashbox = async (req, res) => {

    try {
        const { name, type, initial_money, money, UserId } = req.body;

        const cashbox = await Cashbox.create({
            name, type, initial_money, money, UserId
        });

        res.status(200).json({ status: 'success-alert', message: "Se creo una caja con exito!", cashbox })
    } catch (error) {
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

const updateCashbox = async (req, res) => {

    try {
        const { id, name, type, initial_money, money, UserId } = req.body;

        const cashbox = await Cashbox.findOne({
            where: { id },
        })

        cashbox.set(req.body);
        await cashbox.save();

        res.status(200).json({ status: 'warning-alert', message: "Se actualizo correctamente", cashbox })
    } catch (error) {
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

const deleteCashbox = async (req, res) => {

    try {

        const { id } = req.body;

        const cashbox = await Cashbox.findByPk(id, {
            include: [Sale, Box_Product]
        });

        if (cashbox.Sales[0]) return deshabilitar();

        async function deshabilitar() {
            cashbox.set({ id, status: 0 });
            await cashbox.save();
            res.status(200).json({ status: 'warning-alert', message: "Se deshabilito correctamente" })
        }

        await Box_Product.destroy({
            where: {
                CashboxId: id,
            }
        })
        await cashbox.destroy();
        res.status(200).json({ status: 'warning-alert', message: "Se elimino correctamente" })
    } catch (error) {
        console.log(error)
        res.status(200).json({ status: 'danger-alert', message: "No se pudo realizar la accion" })
    }

}

module.exports = {
    indexCashbox,
    createCashbox,
    updateCashbox,
    deleteCashbox
}