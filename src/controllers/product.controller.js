import Product from '../models/product.model.js';

class ProductController {
    // Create a new product
    async create(req, res) {
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Get all products
    async getAll(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Get a single product by ID
    async getOne(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) return res.status(404).json({ message: "Product not found" });
            res.status(200).json(product);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Update a product by ID
    async update(req, res) {
        try {
            const [updated] = await Product.update(req.body, { where: { id: req.params.id } });
            if (updated) {
                const updatedProduct = await Product.findByPk(req.params.id);
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Delete a product by ID
    async delete(req, res) {
        try {
            const deleted = await Product.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(200).json({ message: "Product deleted successfully" });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

export default new ProductController;
