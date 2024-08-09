import Image from "next/image";
import Link from "next/link";
import BoatList from "./components/BoatList";
import FlightList from "./components/FlightList";
import Settings from "./components/Settings";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <FlightList />
      <BoatList />
      <Settings />
    </main>
  );
}
