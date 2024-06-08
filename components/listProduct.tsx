import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListProductProps {
  title: string;
  price: number;
  createdAt: Date;
  photo: string;
  id: number;
}

export default function ListProduct({
  title,
  price,
  createdAt,
  photo,
  id,
}: ListProductProps) {
  return (
    <Link href={`/products/${id}`} className="flex gap-5">
      <div className="size-28 relative rounded-md overflow-hidden">
        <Image fill src={photo} alt={title}></Image>
      </div>
      <div className="flex flex-col gap-1 *:text-white ">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(createdAt.toDateString())}
        </span>
        <span className="text-lg">{formatToWon(price)}원</span>
      </div>
    </Link>
  );
}
