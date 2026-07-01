import type { Request, Response, NextFunction } from "express";
import type { CreateOrderDto } from "../schemas/ordersSchema";
import { createOrderService, updateOrderStatusService } from "../services/ordersServices";
import type { OrderStatus } from "../../generated/prisma/enums";

export async function getOrderById (req: Request, res: Response) {
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
  const { order } = req;
  const { status } = req.body;

  const transitions: Record<OrderStatus, OrderStatus[]> = {
      pending: ["paid", "cancelled"],
      paid: [],
      cancelled: []
  };

  try {
    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status === "paid") {
      throw new Error("Paid orders cannot be modified");
    }

    const currentStatus = order.status;
    const allowedTransitions = transitions[currentStatus];

    if (!allowedTransitions.includes(status)) {
      throw new Error(`Invalid status transition from '${currentStatus}' to ${status}`);
    }

    const updatedOrder = await updateOrderStatusService(id, status);

    return res.status(200).json({
      success: true,
      message: `Order status updated to ${status} successfully`,
      data: updatedOrder
    });
  } catch (error) {
    return next(error);
  }
}