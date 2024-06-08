import ProductList from "@/components/ProductList";
import ListProduct from "@/components/listProduct";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getInitialProduct() {
  const products = await db.porduct.findMany({
    select: {
      title: true,
      price: true,
      createdAt: true,
      photo: true,
      id: true,
    },
    take: 1,
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
}
export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProduct
>;

export default async function Product() {
  const initialProducts = await getInitialProduct();
  return (
    <div>
      <ProductList initialProcuts={initialProducts}></ProductList>
    </div>
  );
}
