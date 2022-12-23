import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function deleteProductByID(req: Request, res: Response) {
  try {
    const { product_id } = req.params;

    await Product.findByIdAndDelete(product_id);

    res.status(200).json(
      {message: 'Product deleted successfully'}
    );

  } catch (error: any) {
    res.status(error.code || 500).json({
      message: error.message || 'Internal server error'
    });
  }
}
