import { formatTime } from "../utils/time";
import { getDirection, percentage } from "../utils/trains";
import { Counter } from "./Counter";

export default function Train({ train }: { train: any }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-[80px_100px_2fr_1fr_300px] bg-gray-800 text-white p-4 rounded-lg shadow-lg gap-4 md:gap-0 m-4">
      <div className="text-6xl md:row-span-2 flex items-center">🚂</div>
      <div className="text-2xl font-medium text-center md:row-span-2 flex items-center">{train.number}</div>
      <div className="text-3xl col-span-2 md:col-span-1 md:text-5xl font-bold md:row-span-2 flex items-center">
        {getDirection(train)}-bound<br />{train.destination}
      </div>
      <div className="md:text-3xl text-center text-xl">{formatTime(train.departureTime)} - {formatTime(train.arrivalTime)}</div>
      <div className="md:col-start-4 md:row-start-2 md:text-2xl text-center text-xl">{train.line}</div>
      <div className="md:col-start-5 md:row-start-1 md:row-span-2 col-span-2 md:col-span-1 text-2xl md:text-2xl font-medium text-right flex justify-end items-center">
        <Counter value={(train.arrivalTime.getTime() - Date.now()) / 60 / 1000} speed={-1/60} />
        min until next station
      </div>
    </div>
  );
}
