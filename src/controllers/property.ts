import { Request, Response } from "express";
import Property from "../models/property";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

class PropertyController {
  async getAllProperties(req: Request, res: Response) {
    try {
      const { name, city, state } = req.query;
      const whereClause: any = [];

      if (name) {
        whereClause.push({ propertyName: { [Op.like]: `%${name}%` } });
      }
      if (city) {
        whereClause.push({ city: { [Op.like]: `%${city}%` } });
      }
      if (state) {
        whereClause.push({ state: { [Op.like]: `%${state}%` } });
      }

      const query = whereClause.length > 0 ? { [Op.or]: whereClause } : {};

      console.log("Constructed Query:", query);

      const properties = await Property.findAll({ where: query });
      console.log("Properties Fetched:", properties);

      res.json(properties);
    } catch (error: any) {
      console.log("Error:", error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async createProperty(req: Request, res: Response) {
    try {
      const {
        propertyName,
        address,
        city,
        state,
        zipCode,
        numberOfUnits,
        managerName,
        managerEmail,
        managerPhone,
      } = req.body;
      const ownerId = req.user.details.id;

      const property = await Property.create({
        id: uuidv4(),
        ownerId,
        propertyName,
        address,
        city,
        state,
        zipCode,
        numberOfUnits,
        managerName,
        managerEmail,
        managerPhone,
      });
      res.status(201).json(property);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPropertyById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const property = await Property.findByPk(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateProperty(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        propertyName,
        address,
        city,
        // ownerId,
        // state,
        zipCode,
        numberOfUnits,
        managerName,
        managerEmail,
        managerPhone,
      } = req.body;
      console.log('Update Property ID:', id);
    console.log('Update Payload:', req.body);
    const ownerId = req.user.details.id;

      const property = await Property.findByPk(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      property.propertyName = propertyName;
      property.address = address;
      property.ownerId = ownerId;
      property.city = city;
      // property.state = state;
      property.zipCode = zipCode;
      property.numberOfUnits = numberOfUnits;
      property.managerName = managerName;
      property.managerEmail = managerEmail;
      property.managerPhone = managerPhone;
      await property.save();
      res.json(property);
    } catch (error: any) {
      console.error('Error updating property:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async deleteProperty(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const property = await Property.findByPk(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      await property.destroy();
      res.json({ message: "Property deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default PropertyController;
