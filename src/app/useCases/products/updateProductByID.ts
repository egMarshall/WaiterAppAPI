import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function updateProductByID(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;

    const productModel = Object.assign(req.body);

    const product = await Product.updateOne(
      {_id: req.params.product_id},
      {$set: productModel, imagePath},
      {upsert: true}
    );

    res.status(201).json(product);

  } catch (error: any) {
    res.status(error.code || 500).json({
      message: error.message || 'Internal server error'
    });
  }
}
