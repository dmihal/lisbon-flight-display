"use client"
import { useEffect, useState } from "react";
import { Point, distanceBetweenPoints, isPointInQuadrilateral, knotsToKmPerSec } from "../utils/geo";
import { getAirline, getAirport, getPlane } from "../utils/flights";
import { Counter } from "./Counter";
import Settings from "./Settings";
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

const tejo: Point[] = [
  {
    x: -9.1381453,
    y: 38.7029544
  },
  {
    x: -9.2107581,
    y: 38.6900927
  },
  {
    x: -9.2074965,
    y: 38.6784348
  },
  {
    x: -9.135742,
    y: 38.6919685
  }
];

export default function FlightList() {
  const [liveFlights, setLiveFlights] = useState<any[]>([]);
  const [trains, setTrains] = useState<any[]>([]);
  const [boats, setBoats] = useState<any[]>([]);

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

  const refreshTrains = async () => {
    const response = await fetch("/api/trains");
    const data = await response.json();
    setTrains(data.stations
      .map((station: any) => station.departures)
      .flat()
      .filter((train: any) => train.brand_id === 'LisbonFertagus')
    );
  };

  const refreshBoats = async () => {
    // const response = await fetch("/api/boats");
    // const data = await response.json();
    // const selectedBoats = data.data.rows.filter((boat: any) => {
    //   const location = { x: boat.LAT, y: boat.LON };
    //   return isPointInQuadrilateral(location, tejo);
    // });
    // setBoats(selectedBoats);
  };

  useEffect(() => {
    refreshFlights();
    refreshTrains();
    refreshBoats();

    const flightInterval = setInterval(refreshFlights, 5000);
    const trainInterval = setInterval(refreshTrains, 30000);
    const boatInterval = setInterval(refreshBoats, 30000);

    return () => {
      clearInterval(flightInterval);
      clearInterval(trainInterval);
      clearInterval(boatInterval);
    }
  }, []);

  const upcomingTrains = trains
    .map((train: any) => {
      const northbound = train.destination === 'Roma-Areeiro';
      const arrivalTime = new Date(train.stops[0].arrival_time);
      const timeUntilArrival = (arrivalTime.getTime() - Date.now()) / 1000;

      if (timeUntilArrival < 1000) {
        console.log({northbound, timeUntilArrival, destination: train.destination});
      }

      return { ...train, northbound, timeUntilArrival };
    })
    .filter((train: any) => {
      return train.northbound
        ? train.timeUntilArrival > 350 && train.timeUntilArrival < 600
        : train.timeUntilArrival > 500 && train.timeUntilArrival < 600;
  });

  return (
    <div>
      {liveFlights.map((flight) => (
        <Flight
          key={flight.extraInfo.flight}
          airport={getAirport(flight.isArriving ? flight.extraInfo.route.from : flight.extraInfo.route.to)}
          inbound={flight.isArriving}
          number={flight.extraInfo.flight}
          plane={getPlane(flight.extraInfo.type)}
          airline={getAirline(flight.extraInfo.flight)}
          distance={flight.distanceToHome}
          speed={knotsToKmPerSec(flight.speed) * -1}
        />
      ))}
      {upcomingTrains.map((train) => (
        <pre key={train.trip_equivalence_id}>
          🚂{train.destination} - {train.timeUntilArrival}s until {train.northbound ? 'Campolide' : 'Pragal'}
        </pre>
      ))}
      {boats.map((boat) => (
        <pre key={boat.SHIP_ID}>
          🚤{boat.SHIPNAME} - {boat.DESTINATION}
        </pre>
      ))}

      <Settings />
    </div>
  )
}
