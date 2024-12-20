// import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to My Next.js Website</h1>
      <p>Next.js makes building web applications easy!</p>
      <Link href="/mobile" className="text-blue-600 hover:underline">
        Go to Download Page
      </Link>
    </main>
  );
}
