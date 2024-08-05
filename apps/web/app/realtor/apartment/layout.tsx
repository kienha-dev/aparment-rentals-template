import Sidebar from "@/components/layout/sidebar";

export default function RealtorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex">
      <Sidebar />
      {children}
    </section>
  );
}
