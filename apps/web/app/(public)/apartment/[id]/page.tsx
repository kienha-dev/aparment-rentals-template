import { APP_ROUTER } from "@/constants";
import { getApartmentById } from "@/services/apartment/server";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  if (!params.id) {
    return {
      title: "Apartment",
      description: "Apartment",
    };
  }

  const apartment = await getApartmentById(params.id);

  if (!apartment) {
    return {
      title: "Apartment",
      description: "Apartment",
    };
  }

  return {
    title: `Apartment | ${apartment.title}`,
    description: apartment.description,
    openGraph: {
      images: [apartment.previewImage],
    },
  };
}

export default async function ApartmentDetail({ params: { id } }: Props) {
  if (!id) {
    notFound();
  }

  const apartment = await getApartmentById(id);

  if (!apartment) {
    notFound();
  }

  return (
    <main className="container mx-auto min-h-screen p-8">
      <Link
        href={APP_ROUTER.HOME}
        className="flex items-center mb-4 space-x-1 hover:underline cur"
      >
        <ChevronLeft size={16} />
        Back to home
      </Link>
      <div className="w-2/3 relative mb-4 mx-auto">
        <Image
          src={apartment.previewImage}
          alt={apartment.title}
          className="w-full aspect-video rounded-lg object-cover"
          width={1920}
          height={400}
        />
      </div>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">{apartment.title}</h1>
        <div className="grid grid-cols-4 gap-4">
          <label className="text-gray-900 col-span-1 font-semibold">
            Price:
          </label>
          <p className="text-gray-600 col-span-3">{apartment.price}$/month</p>
          <label className="text-gray-900 col-span-1 font-semibold">
            Room size:
          </label>
          <p className="text-gray-600 col-span-3">{apartment.areaSize}m2</p>
          <label className="text-gray-900 col-span-1 font-semibold">
            Room No.:{" "}
          </label>
          <p className="text-gray-600 col-span-3">{apartment.roomNo}</p>
          <label className="text-gray-900 col-span-1 font-semibold">
            Description:
          </label>
          <p className="text-gray-600 col-span-3">{apartment.description}</p>
        </div>
      </div>
    </main>
  );
}
