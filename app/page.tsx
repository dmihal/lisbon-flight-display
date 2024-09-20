"use client"
import BoatList from "./components/BoatList";
import FlightList from "./components/FlightList";
import Settings from "./components/Settings";
import { useState } from "react";
import TrainList from "./components/TrainList";

export default function Home() {
  const [showBoats, setShowBoats] = useState(false);
  const [showTrains, setShowTrains] = useState(false);

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <FlightList />
      <TrainList showAll={showTrains} />
      <BoatList showAll={showBoats} />
      <Settings
        showBoats={showBoats}
        onShowBoats={(newShowBoats: boolean) => setShowBoats(newShowBoats)}
        showTrains={showTrains}
        onShowTrains={(newShowTrains: boolean) => setShowTrains(newShowTrains)}
      />
    </main>
  );
}
