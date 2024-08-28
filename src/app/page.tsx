import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">
        Koxy AI Dev
      </h1>

      <Button variant="light" size="sm" className="bg-orange-400/10 border border-orange-400/20 hover:bg-orange-400/20 hover:border-orange-400/20">
        Get Started now
      </Button>
    </main>
  );
}
