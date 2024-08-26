"use client"
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Point, distanceBetweenPoints, isPointInQuadrilateral, knotsToKmPerSec } from "../utils/geo";
import { getAirline, getAirport, getPlane } from "../utils/flights";
import Flight from "./Flight";

if (!process.env.NEXT_PUBLIC_HOME_COORDINATE) {
  throw new Error("Missing NEXT_PUBLIC_HOME_COORDINATE");
}
const [homeX, homeY] = process.env.NEXT_PUBLIC_HOME_COORDINATE.split(",").map(Number);
const home: Point = { x: homeX, y: homeY };

const lisbonArrivalArea: Point[] = [
  {
    x: -9.1824986,
    y: 38.7051307
  },
  {
    x: -9.1638734,
    y: 38.7035566
  },
  {
    x: -9.1258326,
    y: 38.4374679
  },
  {
    x: -9.4540492,
    y: 38.5234711
  }
];

const lisbonDepartureArea: Point[] = [
  {
    x: -9.1869119,
    y: 38.701518
  },
  {
    x: -9.1504412,
    y: 38.6989553
  },
  {
    x: -9.1279516,
    y: 38.7603393
  },
  {
    x: -9.1636571,
    y: 38.7666302
  }
];

interface Flight {
  extraInfo: {
    flight?: string;
    type: string;
    route: {
      from: string;
      to: string;
    };
  };
  lat: number;
  lon: number;
  speed: number;
  isArriving: boolean;
  isDeparting: boolean;
  distanceToHome: number;
}

export default function FlightList() {
  const [liveFlights, setLiveFlights] = useState<Flight[]>([]);

  const refreshFlights = async () => {
    const response = await fetch("/api/flights");
    const data = await response.json();
    const filteredFlights = data.flightsList
      .map((flight: any) => {
        const location = { x: flight.lon, y: flight.lat };
        const isArriving = flight.extraInfo.route?.to === 'LIS' && isPointInQuadrilateral(location, lisbonArrivalArea);
        const isDeparting = flight.extraInfo.route?.from === 'LIS' && isPointInQuadrilateral(location, lisbonDepartureArea);
        const distanceToHome = distanceBetweenPoints(location, home);
        return { ...flight, isArriving, isDeparting, distanceToHome };
      })
      .filter((flight: any) => flight.isArriving || flight.isDeparting)
      .sort((a: any, b: any) => a.distanceToHome - b.distanceToHome);
    console.log(filteredFlights);
    setLiveFlights(filteredFlights);
  }

  useEffect(() => {
    refreshFlights();
    const flightInterval = setInterval(refreshFlights, 5000);

    return () => clearInterval(flightInterval);
  }, []);

  return (
    <div>
      {liveFlights.map((flight) => (
        <ErrorBoundary key={flight.extraInfo.flight} fallbackRender={({ error }) => <pre>{error.message}</pre>}>
          <Flight
            airport={getAirport(flight.isArriving ? flight.extraInfo.route.from : flight.extraInfo.route.to)}
            inbound={flight.isArriving}
            number={flight.extraInfo.flight}
            plane={getPlane(flight.extraInfo.type)}
            airline={flight.extraInfo.flight ? getAirline(flight.extraInfo.flight) : "Unknown"}
            distance={flight.distanceToHome}
            speed={knotsToKmPerSec(flight.speed) * -1}
          />
        </ErrorBoundary>
      ))}
    </div>
  )
}
