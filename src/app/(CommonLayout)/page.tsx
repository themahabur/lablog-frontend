import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
        click me
      </Button>
    </div>
  );
}
