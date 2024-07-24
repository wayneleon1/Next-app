import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InputForm } from "@/components/form";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="container mx-auto grid grid-cols-1 md:col-span-2 mt-5">
        <Card className="w-full md:w-[350px]">
          <CardHeader>
            <CardTitle>Create Tasks</CardTitle>
            <CardDescription>
              Create your new task in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Handle form component */}
            <InputForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
