import * as Yup from 'yup';
import Deliverymen from '../models/Deliverymen';

class DeliverymenController {
    async index(req, res) {
        const deliverymen = await Deliverymen.findAll();
        return res.json(deliverymen);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { email, name } = req.body;
        const deliverymanExists = await Deliverymen.findOne({ where: { email }});
        if (deliverymanExists) {
            return res.status(400).json({ error: 'Deliveryman already exists' });
        }

        const { id } = await Deliverymen.create(req.body);
        return res.json({ id, name, email });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            id: Yup.number().required(),
            name: Yup.string(),
            email: Yup.string().email()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const deliverymen = await Deliverymen.findByPk(req.body.id);

        if (req.body.email !== deliverymen.email) {
            const deliverymanExists = await Deliverymen.findOne({ where: { email: req.body.email }});
            if (deliverymanExists) {
                return res.status(400).json({ error: 'Deliveryman already exists' });
            }
        }

        const { id, name, avatar_id, email } = await deliverymen.update(req.body);
        return res.json({ id, name, avatar_id, email });
    }

    async delete(req, res) {
        const schema = Yup.object().shape({
            id: Yup.number().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const deliverymen = await Deliverymen.findByPk(req.body.id);
        await deliverymen.destroy();
        return res.json({ message: "Deliverymen was removed"});
    }
}

export default new DeliverymenController();
