import Payment from '../models/payment.model.js';

class PaymentController {
    async createPayment(req, res) {
        try {
            const payment = await Payment.create(req.body);
            res.status(201).json(payment);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Barcha to'lovlarni olish
    async getAllPayments(req, res) {
        try {
            const payments = await Payment.findAll();
            res.status(200).json(payments);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Bitta to'lovni ID bo'yicha olish
    async getPayment(req, res) {
        try {
            const payment = await Payment.findByPk(req.params.id);
            if (!payment) return res.status(404).json({ message: 'Payment not found' });
            res.status(200).json(payment);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // To'lovni yangilash
    async updatePayment(req, res) {
        try {
            const [updated] = await Payment.update(req.body, { where: { id: req.params.id } });
            if (updated) {
                const updatedPayment = await Payment.findByPk(req.params.id);
                res.status(200).json(updatedPayment);
            } else {
                res.status(404).json({ message: 'Payment not found' });
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // To'lovni o'chirish
    async deletePayment(req, res) {
        try {
            const deleted = await Payment.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(200).json({ message: 'Payment deleted successfully' });
            } else {
                res.status(404).json({ message: 'Payment not found' });
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

export default new PaymentController();
