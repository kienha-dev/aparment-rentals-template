import { ApartmentDataForm } from "@/components/module/apartments/data-form";
import { getApartmentById } from "@/services/apartment/server";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function RealtorApartmentDetail({
  params: { id },
}: Props) {
  if (!id) {
    notFound();
  }

  const apartment = await getApartmentById(id);

  return (
    <main className="container mx-auto min-h-screen p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Edit</h2>
      </div>
      <div className="mt-6">
        <ApartmentDataForm initialData={apartment} />
      </div>
    </main>
  );
}
