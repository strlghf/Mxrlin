import type { Request, Response, NextFunction } from "express";
import type { CreateOrderDto } from "../schemas/ordersSchema";
import { createOrderService, updateOrderStatusService } from "../services/ordersServices";

export async function getOrderById (req: Request, res: Response, next: NextFunction) {
  const { order } = req;

  return res.status(200).json({
    success: true,
    data: order
  });
}

export async function createOrder (req: Request, res: Response, next: NextFunction) {
  const { user_id, items } = req.body as CreateOrderDto;

  try {
    const newOrder = await createOrderService(user_id, items);

    return res.status(201).json({
      success: true,
      data: newOrder
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateOrderStatus (req: Request, res: Response, next: NextFunction) {
  const { id } = req.order;
  const { status } = req.body;

  try {
    const updatedOrder = await updateOrderStatusService(id, status);

    return res.status(200).json({
      success: true,
      message: `Order status updated to ${status} successfully`,
      data: updatedOrder
    })
  } catch (error) {
    return next(error);
  }
}