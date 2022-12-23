import { Request, Response } from 'express';
import { InvalidInputError } from '../../errors/InvalidInput.Error';

import { Category } from '../../models/Category';

export async function createCategory(req: Request, res: Response) {
  try {
    const { name, icon } = req.body;

    if (!name || !icon) {
      throw new InvalidInputError('Name and Icon are required');
    }

    const category = await Category.create({ name, icon });

    res.status(201).json(category);
  } catch (error: any) {
    res.status(error.code || 500).json({
      message: error.message || 'Internal server error'
    });
  }
}
