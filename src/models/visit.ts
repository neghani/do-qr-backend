import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Visit extends Model {
  public id!: string;
  public visitorMobile?: string;
  public visitorEmail?: string;
  public employeeId?: string;
  public propertyId!: string;
  public unitId?: string;
  public visitDateTime!: Date;
  public purpose!: string;
  public status!: string;
  public checkInDateTime?: Date;
  public checkOutDateTime?: Date;

  // Optional associations
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Visit.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    visitorMobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visitorEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    propertyId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    unitId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    visitDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checkInDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    checkOutDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Visit',
  }
);

export default Visit;