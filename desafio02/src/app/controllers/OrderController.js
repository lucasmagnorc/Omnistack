import * as Yup from 'yup';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliverymen from '../models/Deliverymen';

class OrderController {
    async index(req, res) {
        const orders = await Order.findAll({
            include: [{
                model: Recipient,
                as: 'recipients',
                attributes: [
                    'name',
                    'street',
                    'number',
                    'complement',
                    'state',
                    'city',
                    'zip_code'
                ]
            }, {
                model: Deliverymen,
                as: 'deliverymens',
                attributes: [
                    'name',
                    'avatar_id',
                    'email'
                ]
            }]
        });
        return res.json(orders);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            signature_id: Yup.number(),
            product: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const {
            id,
            product,
            recipient_id,
            deliveryman_id,
            signature_id
        } = await Order.create(req.body);

        return res.json({
            id,
            product,
            recipient_id,
            deliveryman_id,
            signature_id
        });
    }

    async update(req, res) {
         const schema = Yup.object().shape({
            id: Yup.number().required(),
            recipient_id: Yup.number(),
            deliveryman_id: Yup.number(),
            signature_id: Yup.number(),
            product: Yup.string(),
            canceled_at: Yup.date(),
            start_date: Yup.date(),
            end_date: Yup.date()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const order = await Order.findByPk(req.body.id);

        const { id,
            recipient_id,
            deliveryman_id,
            signature_id,
            product,
            canceled_at,
            start_date,
            end_date
        } = await order.update(req.body);

        return res.json({ id,
            recipient_id,
            deliveryman_id,
            signature_id,
            product,
            canceled_at,
            start_date,
            end_date
        });
    }

    async delete(req, res) {
        const schema = Yup.object().shape({
            id: Yup.number().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const order = await Order.findByPk(req.body.id);
        await order.destroy();
        return res.json({ message: "Order was removed"});
    }
}

export default new OrderController();
