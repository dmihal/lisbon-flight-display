import Image from "next/image";
import Link from "next/link";
import FlightList from "./components/FlightList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <FlightList />
    </main>
  );
}
