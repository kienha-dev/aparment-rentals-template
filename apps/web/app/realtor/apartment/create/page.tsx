import { ApartmentDataForm } from "@/components/module/apartments/data-form";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default async function RealtorApartmentCreate() {
  return (
    <main className="container mx-auto min-h-screen p-8">
      <div>
        <Breadcrumb />
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Post new apartment</h2>
      </div>
      <div className="mt-6">
        <ApartmentDataForm />
      </div>
    </main>
  );
}
