import ProductList from "@/components/ProductList";
import ListProduct from "@/components/listProduct";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";

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
      <Link
        href="/products/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10"></PlusIcon>
      </Link>
    </div>
  );
}
