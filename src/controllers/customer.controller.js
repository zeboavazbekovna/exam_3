import Customer from '../models/customer.model.js';

class CustomerController {
    // Create a new customer
    async create(req, res) {
        try {
            const customer = await Customer.create(req.body);
            res.status(201).json(customer);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Get all customers
    async getAll(req, res) {
        try {
            const customers = await Customer.findAll();
            res.status(200).json(customers);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Get a single customer by ID
    async getOne(req, res) {
        try {
            const customer = await Customer.findByPk(req.params.id);
            if (!customer) return res.status(404).json({ message: "Customer not found" });
            res.status(200).json(customer);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Update a customer by ID
    async update(req, res) {
        try {
            const [updated] = await Customer.update(req.body, { where: { id: req.params.id } });
            if (updated) {
                const updatedCustomer = await Customer.findByPk(req.params.id);
                res.status(200).json(updatedCustomer);
            } else {
                res.status(404).json({ message: "Customer not found" });
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Delete a customer by ID
    async delete(req, res) {
        try {
            const deleted = await Customer.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(200).json({ message: "Customer deleted successfully" });
            } else {
                res.status(404).json({ message: "Customer not found" });
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

export default new CustomerController;
