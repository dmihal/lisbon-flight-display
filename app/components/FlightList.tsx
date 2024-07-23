"use client"
import { useEffect, useState } from "react";
import { Point, isPointInQuadrilateral } from "../utils/geo";
import { getAirline, getAirport, getPlane } from "../utils/flights";

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

export default function FlightList() {
  const [liveFlights, setLiveFlights] = useState<any[]>([]);
  const [trains, setTrains] = useState<any[]>([]);

  const refreshFlights = async () => {
    const response = await fetch("/api/flights");
    const data = await response.json();
    const filteredFlights = data.flightsList
      .map((flight: any) => {
        const location = { x: flight.lon, y: flight.lat };
        const isArriving = flight.extraInfo.route?.to === 'LIS' && isPointInQuadrilateral(location, lisbonArrivalArea);
        const isDeparting = flight.extraInfo.route?.from === 'LIS' && isPointInQuadrilateral(location, lisbonDepartureArea);
        return { ...flight, isArriving, isDeparting };
      })
      .filter((flight: any) => flight.isArriving || flight.isDeparting);
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
  }

  useEffect(() => {
    refreshFlights();
    refreshTrains();
    const flightInterval = setInterval(refreshFlights, 5000);
    const trainInterval = setInterval(refreshTrains, 30000);
    return () => {
      clearInterval(flightInterval);
      clearInterval(trainInterval);
    }
  }, []);

  const upcomingTrains = trains.filter((train) => {
    const northbound = train.destination === 'Roma-Areeiro';
    const arrivalTime = new Date(train.stops[0].arrival_time);
    const timeUntilArrival = (arrivalTime.getTime() - Date.now()) / 1000;

    return northbound
      ? timeUntilArrival > 60 && timeUntilArrival < 120
      : timeUntilArrival > 0 && timeUntilArrival < 60;
  });

  return (
    <div>
      <h1>Flight List</h1>
      {liveFlights.map((flight) => (
        <pre key={flight.extraInfo.flight}>
          ✈️{flight.extraInfo.flight} - {getAirport(flight.extraInfo.route.from)} - {getAirport(flight.extraInfo.route.to)} - {getPlane(flight.extraInfo.type)} - {flight.extraInfo.flight ? getAirline(flight.extraInfo.flight) : 'Unknown'}
        </pre>
      ))}
      {upcomingTrains.map((train) => (
        <pre key={train.trip_equivalence_id}>
          🚂{train.destination}
        </pre>
      ))}
    </div>
  )
}
