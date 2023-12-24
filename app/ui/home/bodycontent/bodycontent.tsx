import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { Featurecard } from "./featurecard/featurecard";
import { Button } from "@/components/ui/button";

const Bodycontent = async () => {
  const session = await getServerSession(options);
  return (
    <section className="md:py-20 py-10 bg-gradient-to-r from gray-00 to-gray-100 spacey-10">
      <div className="container mx-auto text-center items-center">
        <div className="text-5xl  flex justify-center font-bold md:px-20 pb-10 text-gradient bg-gradient-to-r from-orange-500 to-green-300 bg-clip-text text-transparent">
          Revolutionize your lending operations with Kolekta
        </div>
        <p className="text-lg md:text-xl md-10 bg-gradient-to-r from-gray-500 to-gray-400 bg-clip-text text-transparent font-bold">
          Effortless Management of Collectors, Clients, Sales, and More –
          Anytime, Anywhere.
        </p>
        <div className="flex gap-4 justify-center pt-10 mb-10">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="bg-orange-300 px-10 py-4 rounded-md text-lg font-bold"
            >
              Sign Up
            </Button>
          </Link>
          {session ? (
            <Link href="/dashboard">
              <Button className="px-10 py-4 rounded-md text-lg font-bold">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/api/auth/signin?callbackUrl=/dashboard">
              <Button className="px-10 py-4 rounded-md text-lg font-bold">
                Login
              </Button>
            </Link>
          )}
        </div>
        <div className="my-5 text-lg font-bold">Key Features</div>
        <div className="pt-5">
          <Featurecard />
        </div>
      </div>
    </section>
  );
};

export default Bodycontent;
