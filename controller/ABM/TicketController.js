const { Product } = require("../../models/Product");
const { Ticket } = require("../../models/Ticket");

const indexTicket = async (req, res) => {
    const tickets = await Ticket.findAll();
    res.render('admin/tickets', { tickets: tickets, user: req.user })
}

const createTicket = async (req, res) => {

    try {
        const { type, description, price, stock, qr_code, valid_date, valid_time } = req.body;

        const ticket = await Ticket.create({
            type, description, price, stock, qr_code, valid_date, valid_time
        });
        res.status(200).json({ status: 'success-alert', message: "Successfully Registered", ticket })
    } catch (error) {
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

const updateTicket = async (req, res) => {


    try {

        const { id, type, decription, price, stock, qr_code, valid_date, valid_time } = req.body;

        const ticket = await Ticket.findOne({
            where: { id },
        })

        ticket.set(req.body);
        await ticket.save();

        res.status(200).json({ status: 'success-alert', message: "Successfully Registered", ticket })
    } catch (error) {
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

const deleteTicket = async (req, res) => {

    try {

        const { id } = req.body;

        await Ticket.destroy({
            where: { id },
        });

        res.status(200).json({ message: "Successfully Registered" })
    } catch (error) {
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

module.exports = {
    indexTicket,
    createTicket,
    updateTicket,
    deleteTicket
}