import { Request, Response } from "express";
import Unit from "../models/unit";
import { v4 as uuidv4 } from "uuid";

export const createUnit = async (req: Request, res: Response) => {
  try {
    const {
      unitNumber,
      propertyId,
      userId,
      floorNumber,
      squareFeet,
      numberOfBedrooms,
      numberOfBathrooms,
      occupied,
      rentAmount,
      leaseStart,
      leaseEnd,
      occupants,
    } = req.body;

    const unit = await Unit.create({
      id: uuidv4(),
      unitNumber,
      propertyId,
      userId,
      floorNumber,
      squareFeet,
      numberOfBedrooms,
      numberOfBathrooms,
      occupied,
      rentAmount,
      leaseStart,
      leaseEnd,
      occupants,
    });

    res.status(201).json(unit);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUnits = async (req: Request, res: Response) => {
  try {
    const units = await Unit.findAll();
    res.status(200).json(units);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUnit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      unitNumber,
      propertyId,
      userId,
      floorNumber,
      squareFeet,
      numberOfBedrooms,
      numberOfBathrooms,
      occupied,
      rentAmount,
      leaseStart,
      leaseEnd,
      occupants,
    } = req.body;

    const unit = await Unit.findByPk(id);

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    await unit.update({
      unitNumber,
      propertyId,
      userId,
      floorNumber,
      squareFeet,
      numberOfBedrooms,
      numberOfBathrooms,
      occupied,
      rentAmount,
      leaseStart,
      leaseEnd,
      occupants,
    });

    res.status(200).json(unit);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUnit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const unit = await Unit.findByPk(id);

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    await unit.destroy();

    res.status(204).end();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const addOccupant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const unit: any = await Unit.findByPk(id);

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    // Check if the userId is already in occupants array
    if (!unit.occupants.includes(userId)) {
      unit.occupants.push(userId);
      await unit.save();
    }

    res.status(200).json(unit);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const removeOccupant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const unit: any = await Unit.findByPk(id);

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    // Filter out userId from occupants array
    unit.occupants = unit?.occupants.filter(
      (occupantId:string) => occupantId !== userId
    );

    await unit.save();

    res.status(200).json(unit);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export class UnitController {
  async getAllUnits(req: Request, res: Response) {
    try {
      const units = await Unit.findAll();
      res.json(units);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createUnit(req: Request, res: Response) {
    try {
      const {
        unitNumber,
        propertyId,
        userId,
        floorNumber,
        squareFeet,
        numberOfBedrooms,
        numberOfBathrooms,
        occupied,
        rentAmount,
        leaseStart,
        leaseEnd,
      } = req.body;
      const unit = await Unit.create({
        id: uuidv4(),
        unitNumber,
        propertyId,
        userId,
        floorNumber,
        squareFeet,
        numberOfBedrooms,
        numberOfBathrooms,
        occupied,
        rentAmount,
        leaseStart,
        leaseEnd,
      });
      res.status(201).json(unit);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUnitById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const unit = await Unit.findByPk(id);
      if (!unit) {
        return res.status(404).json({ message: "Unit not found" });
      }
      res.json(unit);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUnit(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        unitNumber,
        propertyId,
        userId,
        floorNumber,
        squareFeet,
        numberOfBedrooms,
        numberOfBathrooms,
        occupied,
        rentAmount,
        leaseStart,
        leaseEnd,
      } = req.body;
      const unit = await Unit.findByPk(id);
      if (!unit) {
        return res.status(404).json({ message: "Unit not found" });
      }
      unit.unitNumber = unitNumber;
      unit.propertyId = propertyId;
      unit.userId = userId;
      unit.floorNumber = floorNumber;
      unit.squareFeet = squareFeet;
      unit.numberOfBedrooms = numberOfBedrooms;
      unit.numberOfBathrooms = numberOfBathrooms;
      unit.occupied = occupied;
      unit.rentAmount = rentAmount;
      unit.leaseStart = leaseStart;
      unit.leaseEnd = leaseEnd;
      await unit.save();
      res.json(unit);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUnit(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const unit = await Unit.findByPk(id);
      if (!unit) {
        return res.status(404).json({ message: "Unit not found" });
      }
      await unit.destroy();
      res.json({ message: "Unit deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default UnitController;
