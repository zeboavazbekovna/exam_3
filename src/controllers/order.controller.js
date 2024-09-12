import Order from '../models/order.model.js';

class OrderController {
    async create(req, res) {
        try {
            const order = await Order.create(req.body);
            res.status(201).json(order);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async getAll(req, res) {
        try {
            const orders = await Order.findAll();
            res.status(200).json(orders);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async getOne(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);
            if (!order) return res.status(404).json({ message: "Order not found" });
            res.status(200).json(order);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async update(req, res) {
        try {
            const [updated] = await Order.update(req.body, { where: { id: req.params.id } });
            if (updated) {
                const updatedOrder = await Order.findByPk(req.params.id);
                res.status(200).json(updatedOrder);
            } else {
                res.status(404).json({ message: "Order not found" });
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async delete(req, res) {
        try {
            const deleted = await Order.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(200).json({ message: "Order deleted successfully" });
            } else {
                res.status(404).json({ message: "Order not found" });
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

export default new OrderController();
