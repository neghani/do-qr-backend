import { Request, Response } from 'express';
import Visit from '../models/visit';

// Create a new visit
export const createVisit = async (req: Request, res: Response) => {
  try {
    const {
      visitorMobile,
      visitorEmail,
      employeeId,
      propertyId,
      unitId,
      visitDateTime,
      purpose,
      status,
      checkInDateTime,
      checkOutDateTime,
    } = req.body;

    const visit = await Visit.create({
      visitorMobile,
      visitorEmail,
      employeeId,
      propertyId,
      unitId,
      visitDateTime,
      purpose,
      status,
      checkInDateTime,
      checkOutDateTime,
    });

    res.status(201).json(visit);
  } catch (error:any)  {
    res.status(500).json({ message: error.message });
  }
};

// Get all visits
export const getVisits = async (req: Request, res: Response) => {
  try {
    const visits = await Visit.findAll();
    res.status(200).json(visits);
  } catch (error:any)  {
    res.status(500).json({ message: error.message });
  }
};

// Get visit by ID
export const getVisitById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const visit = await Visit.findByPk(id);

    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }

    res.status(200).json(visit);
  } catch (error:any)  {
    res.status(500).json({ message: error.message });
  }
};

// Update visit by ID
export const updateVisit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      visitorMobile,
      visitorEmail,
      employeeId,
      propertyId,
      unitId,
      visitDateTime,
      purpose,
      status,
      checkInDateTime,
      checkOutDateTime,
    } = req.body;

    const visit = await Visit.findByPk(id);

    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }

    await visit.update({
      visitorMobile,
      visitorEmail,
      employeeId,
      propertyId,
      unitId,
      visitDateTime,
      purpose,
      status,
      checkInDateTime,
      checkOutDateTime,
    });

    res.status(200).json(visit);
  } catch (error:any)  {
    res.status(500).json({ message: error.message });
  }
};

// Delete visit by ID
export const deleteVisit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const visit = await Visit.findByPk(id);

    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }

    await visit.destroy();

    res.status(204).end();
  } catch (error:any)  {
    res.status(500).json({ message: error.message });
  }
};