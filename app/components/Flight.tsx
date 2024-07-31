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
      <div className="text-5xl w-16">
        {inbound ? '🛬' : '🛫'}
      </div>
      <div className="text-2xl font-medium w-36 text-center">{number}</div>
      <div className="flex-grow text-left text-4xl font-bold">
        {airport}
      </div>
      <div className="flex flex-col text-center w-72">
        <div className="text-xl">{airline}</div>
        <div className="text-xl">{plane}</div>
      </div>
      <div className="text-3xl font-medium w-36 text-right">
        <Counter value={distance} speed={speed} />km
      </div>
    </div>
  );
}
