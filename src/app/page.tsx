import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-blue-100 h-screen w-full">
      <Button>
        <Link href={'/login'}>
          Login
        </Link>
      </Button>
    </main>
  )
}
