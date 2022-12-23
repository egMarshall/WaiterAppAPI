import { Request, Response } from 'express';
import { InvalidInputError } from '../../errors/InvalidInput.Error';

import { Product } from '../../models/Product';

export async function createProduct(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;

    if (!name || !description || !price || !category || !ingredients) {
      throw new InvalidInputError('Name, Description, Price, Category and Ingredients are required');
    }

    const product = await Product.create({
      name,
      description,
      imagePath,
      price: Number(price),
      category,
      ingredients: JSON.parse(ingredients),
    });

    res.status(201).json(product);
  } catch (error: any) {
    res.status(error.code || 500).json({
      message: error.message || 'Internal server error'
    });
  }
}


