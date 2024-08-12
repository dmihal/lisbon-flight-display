"use client"
import BoatList from "./components/BoatList";
import FlightList from "./components/FlightList";
import Settings from "./components/Settings";
import { useState } from "react";

export default function Home() {
  const [showBoats, setShowBoats] = useState(false);

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <FlightList />
      {showBoats && <BoatList />}
      <Settings showBoats={showBoats} onShowBoats={(newShowBoats: boolean) => setShowBoats(newShowBoats)} />
    </main>
  );
}
