// models/Unit.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Property from './property';

class Unit extends Model {
  public id!: string;
  public unitNumber!: string;
  public propertyId!: string;
  public userId!: string;
  public floorNumber!: number;
  public squareFeet!: number;
  public numberOfBedrooms!: number;
  public numberOfBathrooms!: number;
  public occupied!: boolean;
  public rentAmount!: number;
  public leaseStart!: Date;
  public leaseEnd!: Date;
}

Unit.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    unitNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    propertyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model:Property,
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    floorNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    squareFeet: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    numberOfBedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numberOfBathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    occupied: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    rentAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    leaseStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    leaseEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Unit',
  }
);

// Define associations
Unit.belongsTo(User, { foreignKey: 'userId' });
Unit.belongsTo(Property, { foreignKey: 'propertyId' });

export default Unit;