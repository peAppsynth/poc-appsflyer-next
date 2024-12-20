// import Image from "next/image";
import Link from "next/link"; // เพิ่มการ import Link

export default function Mobile() {
    return (
      <main>
        <h1>Download Page</h1>
        <Link href="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </main>
    );
  }