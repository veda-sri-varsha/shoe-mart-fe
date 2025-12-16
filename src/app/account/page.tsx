"use client";

import AccountPage from "@/components/custom/account-page";
import { Footer } from "@/components/custom/footer";
import { Header } from "@/components/custom/header";

export default function Account() {
  return (
    <>
      <Header />
      <AccountPage
        user={{
          name: "Vedasri",
          email: "vedasri@gmail.com",
          phone: "9876543210",
        }}
        recent={[]}
      />
      <Footer />
    </>
  );
}
