import { Counter } from "./Counter";

interface FlightProps {
  airport: string;
  inbound: boolean;
  number: string;
  plane: string;
  airline: string;
  distance: number;
  speed: number;
}

export default function Flight({ airport, inbound, number, plane, airline, distance, speed }: FlightProps) {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <div className="text-4xl w-16">
        {inbound ? '🛬' : '🛫'}
      </div>
      <div className="text-xl w-24">{number}</div>
      <div className="flex-grow text-left text-3xl font-bold">
        {airport}
      </div>
      <div className="flex flex-col text-center w-64">
        <div className="text-lg">{airline}</div>
        <div className="text-lg">{plane}</div>
      </div>
      <div className="text-2xl font-medium w-24 text-right">
        <Counter value={distance} speed={speed} />km
      </div>
    </div>
  );
}
