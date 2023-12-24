import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Customers = () => {
  return (
    <div>
      <div>Customers</div>
      <div>
        <Link href="/api/auth/signout?callbackUrl=/">
          <Button>Logout</Button>
        </Link>
      </div>
    </div>
  );
};

export default Customers;
