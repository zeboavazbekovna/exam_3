import Product from "../models/product.model.js";

class adminController {
    async createProduct(req, res) {
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async getProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) return res.status(404).json({ message: "Mahsulot topilmadi" });
            res.status(200).json(product);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async updateProduct(req, res) {
        try {
            const [updated] = await Product.update(req.body, { where: { id: req.params.id } });
            if (updated) {
                const updatedProduct = await Product.findByPk(req.params.id);
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ message: "Mahsulot topilmadi" });
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async deleteProduct(req, res) {
        try {
            const deleted = await Product.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(200).json({ message: "Mahsulot muvaffaqiyatli o'chirildi" });
            } else {
                res.status(404).json({ message: "Mahsulot topilmadi" });
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

export default new adminController();
