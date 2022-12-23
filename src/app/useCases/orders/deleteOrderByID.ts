import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function deleteOrderByID(req: Request, res: Response) {
  try {
    const { order_id } = req.params;

    await Order.findByIdAndDelete(order_id);

    res.status(200).json({
      message: 'Order deleted successfully',
    });

  } catch (error: any) {
    res.status(error.code || 500).json({
      message: error.message || 'Internal server error'
    });
  }
}
