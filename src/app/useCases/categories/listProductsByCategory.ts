import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function listProductsByCategory(req: Request, res: Response) {
  try {

    const { category_id } = req.params;

    const products = await Product.find().where('category').equals(category_id);

    res.status(200).json(products);
  } catch (error: any) {
    res.status(error.code || 500).json({
      message: error.message || 'Internal server error'
    });
  }
}
