import Sequelize, { Model } from 'sequelize';

class Deliverymen extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            avatar_id: Sequelize.INTEGER,
            email: Sequelize.STRING
        },
        {
            sequelize
        });

        return this;
    }
}

export default Deliverymen;
