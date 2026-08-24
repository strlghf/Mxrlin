-- This is an empty migration.
ALTER TABLE "products" ADD CONSTRAINT "chk_products_price" CHECK (price > 0);
ALTER TABLE "products" ADD CONSTRAINT "chk_products_stock" CHECK (stock >= 0);
ALTER TABLE "orders" ADD CONSTRAINT "chk_orders_total" CHECK (total >= 0);
ALTER TABLE "orders_items" ADD CONSTRAINT "chk_orders_items_quantity" CHECK (quantity > 0);