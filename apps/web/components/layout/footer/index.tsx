import Image from "next/image";

export default function Footer() {
  return (
    <footer className="pt-6 pb-10 border-t">
      <div className="container mx-auto py-3">
        <div className="flex flex-col space-y-2">
          <Image
            src="/svg/logo.svg"
            width={24}
            height={24}
            alt="logo"
            className="w-6 h-6"
          />
          <p>Copyright © 2024 Apartment Rentals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
