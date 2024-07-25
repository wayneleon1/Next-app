import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { InputForm } from "@/components/InputForm";
import { TaskList } from "@/components/TaskList";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 mt-5 gap-2">
        <div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Create New Task</CardTitle>
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
