import ListProduct from "@/components/listProduct";
import db from "@/lib/db";

async function getProducts() {
  const products = await db.porduct.findMany({
    select: {
      title: true,
      price: true,
      createdAt: true,
      photo: true,
      id: true,
    },
  });

  return products;
}

export default async function Product() {
  const products = await getProducts();
  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product}></ListProduct>
      ))}
    </div>
  );
}
