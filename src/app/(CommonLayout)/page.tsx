import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button variant="default">
        click me
      </Button>
    </div>
  );
}
