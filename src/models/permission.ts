import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

class Permission extends Model {
  public id!: string;
  public userId!: string;
  public role!: string; // Change roleId to role
  public groupId!: string;
}

Permission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING, // Use string type for role
      allowNull: false,
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Permission',
  }
);

Permission.belongsTo(User, { foreignKey: 'userId' });

export default Permission;