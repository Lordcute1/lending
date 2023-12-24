import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Featurecard() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-5">
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Client Management</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>

          <CardContent>
            <div>
              <p>
                Build strong relationships with your clients using our robust
                client management tools. From contact details and communication
                history to transaction records, our platform centralizes all
                client-related information. Streamline client interactions,
                ensuring personalized and responsive service.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Collector Tracking</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p>
                Effortlessly monitor and manage your collection team with our
                intuitive collector tracking feature. Stay informed about their
                activities, performance, and assigned tasks in real-time.
                Enhance efficiency and optimize your resources with
                comprehensive insights into collector productivity.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p>
                Empower your business decisions with powerful sales analytics.
                Gain valuable insights into your sales performance, trends, and
                customer behavior. Visualize data through customizable charts
                and reports, allowing you to identify opportunities and make
                informed strategic decisions.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
