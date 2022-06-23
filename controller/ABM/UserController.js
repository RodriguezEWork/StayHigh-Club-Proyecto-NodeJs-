const { Role } = require("../../models/Role");
const { User } = require("../../models/User");
const { Cashbox } = require("../../models/Cashbox");

const indexUser = async (req, res) => {
    const users = await User.findAll({
        include: Role,
    });
    res.render('admin/users', { users: users, user: req.user })
}

const createUser = async (req, res) => {

    try {
        const { name, email, password, confirmAccount, RoleId } = req.body;

        const users = await User.create({
            name, email, password, confirmAccount, RoleId
        });
        res.status(200).json({ status: 'success-alert', message: "Se registro correctamente", users })
    } catch (error) {
        res.status(200).json({ status: 'danger-alert', message: "No se pudo realizar la accion" })
    }

}

const updateUser = async (req, res) => {


    try {

        const { id, name, email, confirmAccount, RoleId } = req.body;

        const usuario = await User.update({
            name: name,
            email: email,
            confirmAccount: confirmAccount,
            RoleId: RoleId
        }, {
            where: { id },
        })

        const users = await User.findOne({
            where: { id },
        });

        res.status(200).json({ status: 'success-alert', message: "Se actualizo correctamente", users })
    } catch (error) {
        res.status(200).json({ status: 'danger-alert', message: "No se pudo realizar la accion" })
    }

}

const deleteUser = async (req, res) => {

    try {

        const { id } = req.body;

        let user = await User.findByPk(id, {
            include: Cashbox
        });

        if (user.Cashbox) {
            // user.set( {id, status: 0});
            // await user.save();
            return renderBreak("Se deshabilito correctamente");
        }

        await user.destroy();
        renderBreak("Pues en este caso deberia funcionar");

    } catch (error) {
        res.status(200).json({ status: 'danger-alert', message: "No se pudo realizar la accion" })
    }

    function renderBreak(msg) {
        res.status(200).json({ status: 'warning-alert', message: msg })
    }

}

module.exports = {
    indexUser,
    createUser,
    updateUser,
    deleteUser
}