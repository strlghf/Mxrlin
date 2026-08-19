-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "fk_user";

-- DropForeignKey
ALTER TABLE "orders_items" DROP CONSTRAINT "fk_product";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_items" ADD CONSTRAINT "fk_product" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
