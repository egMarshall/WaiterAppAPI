import { Request, Response } from 'express';
import { io } from '../../..';
import { InvalidInputError } from '../../errors/InvalidInput.Error';

import { Order } from '../../models/Order';

export async function createOrder(req: Request, res: Response) {
  try {
    const { table, products } = req.body;

    if (!table || !products) {
      throw new InvalidInputError('Table and Products are required');
    }

    const order = await Order.create({
      table,
      products
    });
    const orderDetails = await order.populate('products.product');

    io.emit('order@new', orderDetails);

    res.status(201).json(order);

  } catch (error: any) {
    res.status(error.code || 500).json({
      message: error.message || 'Internal server error'
    });
  }
}
