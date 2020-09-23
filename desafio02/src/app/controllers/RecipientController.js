import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number().transform(value => (isNaN(value) ? undefined : value)).required(),
            complement: Yup.string(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            zip_code: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { 
            name, 
            street, 
            number, 
            complement, 
            state, 
            city, 
            zip_code 
        } = await Recipient.create(req.body);

        return res.json({ 
            name, 
            street, 
            number, 
            complement, 
            state, 
            city, 
            zip_code 
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            street: Yup.string(),
            number: Yup.string(),
            complement: Yup.string(),
            state: Yup.string(),
            city: Yup.string(),
            zip_code: Yup.string()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { 
            name, 
            street, 
            number, 
            complement, 
            state, 
            city, 
            zip_code 
        } = await Recipient.update(req.body);

        return res.json({ 
            name, 
            street, 
            number, 
            complement, 
            state, 
            city, 
            zip_code 
        });
    }
}

export default new RecipientController();
