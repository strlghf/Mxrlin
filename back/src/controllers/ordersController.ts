import type { Request, Response, NextFunction } from "express";
import type { CreateOrderDto } from "../schemas/ordersSchema";
import { createOrderService, deleteOrderService } from "../services/ordersServices";

export async function getOrderById (req: Request, res: Response, next: NextFunction) {
  const { order } = req;

  return res.status(200).json({
    success: true,
    data: order
  });
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
    return next(error);
  }
}

export async function updateOrder (req: Request, res: Response, next: NextFunction) {
  
}

export async function deleteOrder (req: Request, res: Response, next: NextFunction){
  const { id } = req.params;

  try {
    const parsedId = Number(id);
    await deleteOrderService(parsedId);

    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}