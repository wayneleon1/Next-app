import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputForm } from "@/components/InputForm";
import { TaskList } from "@/components/TaskList";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 mt-5 gap-2">
        <div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Create Tasks</CardTitle>
              <CardDescription>
                Create your new task in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InputForm />
            </CardContent>
          </Card>
        </div>
        <div>
          <TaskList />
        </div>
      </div>
    </main>
  );
}
