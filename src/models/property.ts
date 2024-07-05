import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import User from "./user";

// Attributes for Property model
interface PropertyAttributes {
  id: string;
  ownerId: string;
  propertyName: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  numberOfUnits?: number;
  managerName?: string;
  managerEmail?: string;
  managerPhone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Property model class
class Property extends Model<PropertyAttributes> implements PropertyAttributes {
  public id!: string;
  public propertyName!: string;
  public ownerId!: string;
  public address!: string;
  public city!: string;
  public state!: string;
  public zipCode!: string;
  public numberOfUnits!: number;
  public managerName!: string;
  public managerEmail!: string;
  public managerPhone!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Property.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ownerId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    propertyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(2), // Assuming state abbreviations (e.g., CA, NY)
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING(10), // Allow for extended ZIP codes
      allowNull: true,
    },
    numberOfUnits: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    managerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    managerEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    managerPhone: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: "Property",
    tableName: "properties",
  }
);

Property.belongsTo(User, { foreignKey: "ownerId" });

export default Property;
