import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Attributes for Property model
interface PropertyAttributes {
  id: string;
  propertyName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  numberOfUnits: number;
  managerName: string;
  managerEmail: string;
  managerPhone: string;
}

// Optional attributes for creating a Property
interface PropertyCreationAttributes extends Optional<PropertyAttributes, 'id'> {}

// Property model class
class Property extends Model<PropertyAttributes, PropertyCreationAttributes> implements PropertyAttributes {
  public id!: string;
  public propertyName!: string;
  public address!: string;
  public city!: string;
  public state!: string;
  public zipCode!: string;
  public numberOfUnits!: number;
  public managerName!: string;
  public managerEmail!: string;
  public managerPhone!: string;
}

Property.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    propertyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(2), // Assuming state abbreviations (e.g., CA, NY)
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING(10), // Allow for extended ZIP codes
      allowNull: false,
    },
    numberOfUnits: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    managerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    managerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    managerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Property',
    tableName: 'properties',
  }
);

export default Property;