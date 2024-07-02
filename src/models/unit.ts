import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user'; // Assuming you have a User model for registered users

class Unit extends Model {
  public id!: string;
  public unitNumber!: string;
  public propertyId!: number;
  public userId!: number;
  public floorNumber!: number;
  public squareFeet!: number;
  public numberOfBedrooms!: number;
  public numberOfBathrooms!: number;
  public occupied!: boolean;
  public rentAmount!: number;
  public leaseStart!: Date;
  public leaseEnd!: Date;
  public occupants?: string[]; // Array of user IDs for occupants

  // Optional associations
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    floorNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    squareFeet: {
      type: DataTypes.INTEGER,
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
    },
    rentAmount: {
      type: DataTypes.INTEGER,
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
    occupants: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
      defaultValue: [],
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Unit',
  }
);

export default Unit;