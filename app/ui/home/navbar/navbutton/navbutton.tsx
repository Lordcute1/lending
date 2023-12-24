import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LuAlignJustify } from "react-icons/lu";
import Link from "next/link";
import { ModeToggle } from "./modetoggle/modetoggle";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Navbutton = async () => {
  const session = await getServerSession(options);
  return (
    <div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <LuAlignJustify />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription>
                <div className="flex flex-col space-y-4 items-start w-full text-lg mt-10 gap-4">
                  <ModeToggle />
                  <Link href="/api/auth/signin?callbackUrl=/dashboard">
                    Login
                  </Link>
                  <Link href="/customers">SignUp</Link>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:flex">
        <Link href="/customers">
          <Button className="text-md" variant="ghost">
            Sign Up
          </Button>
        </Link>
        {session ? (
          <Link href="/dashboard">
            <Button className="text-md">Dashboard</Button>
          </Link>
        ) : (
          <Link href="/api/auth/signin?callbackUrl=/dashboard">
            <Button className="text-md">Login</Button>
          </Link>
        )}

        <div className="ml-3">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbutton;
