import { Request, Response } from 'express';
import { InvalidInputError } from '../../errors/InvalidInput.Error';
import { Order } from '../../models/Order';

export async function changeOrderStatusByID(req: Request, res: Response) {
  try {
    const { order_id } = req.params;
    const { status } = req.body;

    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      throw new InvalidInputError('Status should be WAITING, IN_PRODUCTION or DONE');
    }

    await Order.findByIdAndUpdate(order_id, { status });

    res.status(200).json({
      message: 'Order status updated successfully',
    });

  } catch (error: any) {
    res.status(error.code || 500).json({
      message: error.message || 'Internal server error'
    });
  }
}
