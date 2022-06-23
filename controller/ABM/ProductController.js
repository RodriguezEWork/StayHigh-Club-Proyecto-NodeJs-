const { Product } = require("../../models/Product");
const { Product_Combination } = require("../../models/product_Combination");
const { Box_Product } = require("../../models/box_product");
const { Sale } = require("../../models/Sale");
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const indexProduct = async (req, res) => {
    const products = await Product.findAll({
        where: {
            status: 1
        }
    });
    res.render('admin/products', { products: products, user: req.user })
}

const createProduct = async (req, res) => {

    try {

        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {

            const datos = {
                name: fields.name,
                band: fields.band,
                stock: fields.stock,
                minimum_stock: fields.minimum_stock,
                purcharse_price: fields.purcharse_price,
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

            const product = await Product.create({
                name: datos.name,
                band: datos.band,
                stock: datos.stock,
                minimum_stock: datos.minimum_stock,
                purcharse_price: datos.purcharse_price,
                sale_price: datos.sale_price,
                photo: datos.photo,
                quantity_time_validated: datos.quantity_time_validated,
                type_date: datos.type_date,
            });

            res.status(200).json({ status: 'success-alert', message: "Successfully Registered", product })
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

const updateProduct = async (req, res) => {

    try {

        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {

            const datos = {
                id: fields.id,
                name: fields.name,
                band: fields.band,
                stock: fields.stock,
                minimum_stock: fields.minimum_stock,
                purcharse_price: fields.purcharse_price,
                sale_price: fields.sale_price,
                quantity_time_validated: fields.quantity_time_validated,
                type_date: fields.type_date,
            }

            const product = await Product.findOne({
                attributes: ['name', 'band', 'stock', 'minimum_stock', 'purcharse_price', 'sale_price', 'photo', 'quantity_time_validated', 'type_date'],
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
                datos.photo = product.photo;
            }

            product.set(datos);
            await product.save();

            res.status(200).json({ status: 'success-alert', message: "Successfully Registered", product })
        });

    } catch (error) {
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

const deleteProduct = async (req, res) => {

    try {

        const { id } = req.body;

        const producto = await Product.findByPk(id, {
            include: [Sale, Box_Product, Product_Combination]
        });

        if (producto.Box_Products[0]) return deshabilitar();

        if (producto.Sales[0]) return deshabilitar();

        if (producto.Product_Combinations[0]) return deshabilitar();

        async function deshabilitar() {
            producto.set({ id, status: 0 });
            await producto.save();
            res.status(200).json({ status: 'warning-alert', message: "Se deshabilito correctamente" })
        }

        await producto.destroy();
        res.status(200).json({ status: 'warning-alert', message: "Se elimino correctamente" })
    } catch (error) {
        res.status(400).json({ message: "No se pudo realizar la accion" })
    }

}

module.exports = {
    indexProduct,
    createProduct,
    updateProduct,
    deleteProduct
}