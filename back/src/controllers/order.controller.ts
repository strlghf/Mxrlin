import type { Request, Response, NextFunction } from "express";
import type { CreateOrderDto } from "../schemas/order.schema.js";
import type { OrderStatus } from "../generated/prisma/enums.js";
import { createOrderService, updateOrderStatusService } from "../services/order.service.js";
import { AppError } from "../utils/AppError.js";

const transitions: Record<OrderStatus, OrderStatus[]> = {
  pending: ["paid", "cancelled"],
  paid: [],
  cancelled: []
};

export async function getOrderById(req: Request, res: Response, next: NextFunction) {
  const { order } = req;

  try {
    return res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
}

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  const { items } = req.body as CreateOrderDto;
  const { id: user_id } = req.user;

  try {
    if (!user_id) throw new AppError("Id must be a number.", 400);

    const newOrder = await createOrderService(user_id, items);

    return res.status(201).json({
      success: true,
      data: newOrder
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateOrderStatus(req: Request, res: Response, next: NextFunction) {
  const { id } = req.order;
  const { order } = req;
  const { status } = req.body;

  try {
    if (!order) throw new AppError("Order not found.", 404);

    if (order.status === "paid") throw new AppError("Paid orders cannot be modified.", 409);

    const currentStatus = order.status;
    const allowedTransitions = transitions[currentStatus];

    if (!allowedTransitions.includes(status)) {
      throw new AppError(`Invalid status transition from '${currentStatus}' to ${status}.`, 409);
    }

    const updatedOrder = await updateOrderStatusService(id, status);

    return res.status(200).json({
      success: true,
      data: updatedOrder,
      message: `Order status updated to ${status} successfully.`,
    });
  } catch (error) {
    return next(error);
  }
}