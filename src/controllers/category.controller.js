import Category from '../models/category.model.js';

class CategoryController {

    async create(req, res) {
        try {
            const category = await Category.create(req.body);
            res.status(201).json(category);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Get all categories
    async getAll(req, res) {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Get a single category by ID
    async getOne(req, res) {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) return res.status(404).json({ message: "Category not found" });
            res.status(200).json(category);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Update a category by ID
    async update(req, res) {
        try {
            const [updated] = await Category.update(req.body, { where: { id: req.params.id } });
            if (updated) {
                const updatedCategory = await Category.findByPk(req.params.id);
                res.status(200).json(updatedCategory);
            } else {
                res.status(404).json({ message: "Category not found" });
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Delete a category by ID
    async delete(req, res) {
        try {
            const deleted = await Category.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(200).json({ message: "Category deleted successfully" });
            } else {
                res.status(404).json({ message: "Category not found" });
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

export default new CategoryController;
