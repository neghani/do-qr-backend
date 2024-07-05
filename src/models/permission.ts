// models/Permission.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user";
import Property from "./property";
class Permission extends Model {
  public id!: string;
  public groupId!: string;
  public role!: string;
  public userId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Permission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Property,
        key: "id",
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Permission",
  }
);

Permission.belongsTo(User, { foreignKey: "userId" });
Permission.belongsTo(Property, { foreignKey: "groupId" });
export default Permission;
