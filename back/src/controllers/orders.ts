import type { Request, Response, NextFunction } from "express";
import type { CreateOrderDto } from "../schemas/ordersSchema";
import { createOrderService } from "../services/orders";

export async function getOrderById (req: Request, res: Response, next: NextFunction) {
  const { order } = req;

  return res.status(200).json({
    success: true,
    data: order
  })
}

export async function createOrder (req: Request, res: Response, next: NextFunction) {
  const { userId, items } = req.body as CreateOrderDto;

  try {
    const newOrder = await createOrderService(userId, items);

    return res.status(201).json({
      success: true,
      data: newOrder
    });
  } catch (error) {
    return next(error)
  }
}