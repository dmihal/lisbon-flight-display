"use client"
import { useEffect, useState } from "react";
import { isPointInQuadrilateral, Point } from "../utils/geo";
import { shipTypes } from "../utils/boats";
import Boat from "./Boat";

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

const tejoVisible: Point[] = [
  { x: 38.697602, y: -9.1787258 },
  { x: 38.6807862, y: -9.1748714 },
  { x: 38.6839018, y: -9.1606236 },
  { x: 38.6993771, y: -9.1662025 }
];

export default function BoatList() {
  const [boats, setBoats] = useState<any[]>([]);
  const [metadata, setMetadata] = useState<any>({});

  const refreshBoats = async () => {
    const response = await fetch("/api/boats");
    const data = await response.json();
    const selectedBoats = Object.values(data.positions).filter((boat: any) => {
      const { Longitude: lon, Latitude: lat } = boat.Message.PositionReport;
      const location = { x: lat, y: lon };
      console.log(location, tejo);
      return isPointInQuadrilateral(location, tejo);
    }).map((boat: any) => {
      const { Longitude: lon, Latitude: lat } = boat.Message.PositionReport;
      const location = { x: lat, y: lon };
      const isVisible = isPointInQuadrilateral(location, tejoVisible);

      return { ...boat, isVisible };
    });
    setBoats(selectedBoats);
    setMetadata(data.shipData);
  };

  useEffect(() => {
    refreshBoats();

    const boatInterval = setInterval(refreshBoats, 30000);

    return () => clearInterval(boatInterval);
  }, []);

  return (
    <div>
      Visible
      <div>
        {boats.filter(boat => boat.isVisible).map(boat => (
          <Boat key={boat.MetaData.MMSI} boat={boat} staticData={metadata[boat.MetaData.MMSI]?.Message.ShipStaticData} />
        ))}
      </div>
      Others
      <ul>
        {boats.filter(boat => !boat.isVisible).map(boat => (
          <Boat key={boat.MetaData.MMSI} boat={boat} staticData={metadata[boat.MetaData.MMSI]?.Message.ShipStaticData} />
        ))}
      </ul>
    </div>
  )
}
