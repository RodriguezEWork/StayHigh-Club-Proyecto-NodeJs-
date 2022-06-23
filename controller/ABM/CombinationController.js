const { Combination } = require("../../models/Combination");
const { Product_Combination } = require("../../models/product_Combination");
const { Box_Product } = require("../../models/box_product");
const { Sale } = require("../../models/Sale");
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const indexCombination = async (req, res) => {
    const combination = await Combination.findAll({
        where: {
            status: 1
        }
    });
    res.render('admin/combinations', { combination: combination, user: req.user })
}

const createCombination = async (req, res) => {

    try {

        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {

            const datos = {
                name: fields.name,
                band: fields.band,
                sale_price: fields.sale_price,
                quantity_time_validated: fields.quantity_time_validated,
                type_date: fields.type_date,
            }

            const foto = files.photo;

            if (files.photo.originalFilename != "") {

                if (foto.size > 20 * 1024 * 1024) {
                    throw new Error("Máximo 2MB");
                }

                const extension = foto.mimetype.split("/")[1];
                const dirFile = path.join(
                    __dirname,
                    `../../public/uploads/${foto.newFilename}.${extension}`
                );

                fs.renameSync(foto.filepath, dirFile);

                datos.photo = `uploads/${foto.newFilename}.${extension}`
            }

            const combinations = await Combination.create({
                name: datos.name,
                band: datos.band,
                sale_price: datos.sale_price,
                photo: datos.photo,
                quantity_time_validated: datos.quantity_time_validated,
                type_date: datos.type_date,
            });

            res.status(200).json({ status: 'success-alert', message: "Se creo la combinación correctamente", combinations })
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

const updateCombination = async (req, res) => {


    try {

        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {

            const datos = {
                id: fields.id,
                name: fields.name,
                band: fields.band,
                sale_price: fields.sale_price,
                quantity_time_validated: fields.quantity_time_validated,
                type_date: fields.type_date,
            }

            const combinations = await Combination.findOne({
                attributes: ['name', 'band', 'sale_price', 'photo', 'quantity_time_validated', 'type_date'],
                where: { id: datos.id },
            })

            const foto = files.photo;

            if (files.photo.originalFilename != "") {

                if (foto.size > 20 * 1024 * 1024) {
                    throw new Error("Máximo 2MB");
                }

                const extension = foto.mimetype.split("/")[1];
                const dirFile = path.join(
                    __dirname,
                    `../../public/uploads/${foto.newFilename}.${extension}`
                );

                fs.renameSync(foto.filepath, dirFile);

                datos.photo = `uploads/${foto.newFilename}.${extension}`
            } else {
                datos.photo = combinations.photo;
            }

            combinations.set(datos);
            await combinations.save();

            res.status(200).json({ status: 'success-alert', message: "Actualizado correctamente", combinations })
        });

    } catch (error) {
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

const deleteCombination = async (req, res) => {

    try {

        const { id } = req.body;

        const combinacion = await Combination.findByPk(id, {
            include: [Sale, Box_Product, Product_Combination]
        });

        if (combinacion.Box_Products[0]) return deshabilitar();

        if (combinacion.Sales[0]) return deshabilitar();

        async function deshabilitar() {
            combinacion.set({ id, status: 0 });
            await combinacion.save();
            res.status(200).json({ status: 'warning-alert', message: "Se deshabilito correctamente" })
        }

        await Product_Combination.destroy({
            where: {
                CombinationId: id,
            }
        })
        await combinacion.destroy();
        res.status(200).json({ status: 'warning-alert', message: "Se elimino correctamente" })
    } catch (error) {
        console.log(error)
        res.status(200).json({ status: 'danger-alert', message: "No se pudo realizar la accion" })
    }

}

module.exports = {
    indexCombination,
    createCombination,
    updateCombination,
    deleteCombination
}