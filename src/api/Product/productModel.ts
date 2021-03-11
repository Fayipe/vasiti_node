import Sequelize, { Model } from "sequelize";
import { DB } from "../../shared/database";
import { logger } from "../../utils/logger";
import { ALTER_STATE } from "../../config";

export class ProductModel extends Model { }

ProductModel.init(
	{
		product_name: {
			type: Sequelize.STRING(120),
			allowNull: false,
			validate: {
				notNull: {
					msg: "Please provide the Product name",
				},
			},
		},
		product_description: {
			type: Sequelize.TEXT,
		},
		slug: {
			type: Sequelize.STRING(120),
			allowNull: false,
			validate: {
				notNull: {
					msg: "This Product needs a slug",
				},
			},
		},
		product_varieties: {
			type: Sequelize.STRING(100),
		}
	}, {
	sequelize: DB,
	modelName: "products",
},
);

const syncOption: any = {
	alter: ALTER_STATE,
};

// force: true will drop the table if it already exists
ProductModel.sync(syncOption).then(() => {
	logger.info("Product table migrated");
	// Table created
});
