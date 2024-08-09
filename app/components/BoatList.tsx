"use client"
import { useEffect, useState } from "react";
import { isPointInQuadrilateral, Point } from "../utils/geo";

const tejo: Point[] = [
  {
    y: -9.1381453,
    x: 38.7029544
  },
  {
    y: -9.2107581,
    x: 38.6900927
  },
  {
    y: -9.2074965,
    x: 38.6784348
  },
  {
    y: -9.135742,
    x: 38.6919685
  }
];

export default function BoatList() {
  const [boats, setBoats] = useState<any[]>([]);

  const refreshBoats = async () => {
    const response = await fetch("/api/boats");
    const data = await response.json();
    const selectedBoats = Object.values(data.positions).filter((boat: any) => {
      const { Longitude: lon, Latitude: lat } = boat.Message.PositionReport;
      const location = { x: lat, y: lon };
      console.log(location, tejo);
      return isPointInQuadrilateral(location, tejo);
      return true
    });
    setBoats(selectedBoats);
  };

  useEffect(() => {
    refreshBoats();

    const boatInterval = setInterval(refreshBoats, 30000);

    return () => clearInterval(boatInterval);
  }, []);

  return (
    <ul>
      {boats.map(boat => <li>🚤<pre>{boat.MetaData.ShipName}</pre></li>)}
    </ul>
  )
}
