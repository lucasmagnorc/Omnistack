import * as Yup from 'yup';
import Deliverymen from '../models/Deliverymen';

class DeliverymenController {
    async index(req, res) {
        const deliverymen = await Deliverymen.findAll();
        return res.json(deliverymen);
    }

    async store(req, res) {
        const { id, name, email } = await Deliverymen.create(req.body);
        return res.json({ id, name, email });
    }

    async update(req, res) {
        const deliverymen = await Deliverymen.findByPk(req.body.id);
        const { id, name, avatar_id, email } = await deliverymen.update(req.body);
        return res.json({ name, avatar_id, email });
    }

    async delete(req, res) {
        const deliverymen = await Deliverymen.findByPk(req.body.id);
        await deliverymen.destroy();
        return res.json({ message: "Deliverymen was removed"});
    }
}

export default new DeliverymenController();
