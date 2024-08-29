"use client"
import { useEffect, useState } from "react";
import { isPointInQuadrilateral, Point } from "../utils/geo";
import { Counter } from "./Counter";
import Train from "./Train";
import { getDirection, isVisible, percentage } from "../utils/trains";
import { formatTime } from "../utils/time";

const stations = [
  "pragal",
  "campolide",
  "alcantara_mar",
  "belem",
];

const MINUTE = 60 * 1000;

export default function TrainList() {
  const [trains, setTrains] = useState<any[]>([]);
  const [showData, setShowData] = useState(false);

  const refreshTrains = async () => {
    const response = await fetch("/api/trains");
    const data = await response.json();
    const nextTrains = stations.map(station => {
      const trains = data[station][0]["NodesComboioTabelsPartidasChegadas"];
      return trains.map((train: any) => {
        const departureTime = new Date(parseInt(train.DataHoraPartidaChegada_ToOrderByi.substring(6,19)));

        if (train.Observacoes) {
          const match = train.Observacoes.match(/(\d+)\s*min/);
          if (match && match[1]) {
              const delayMinutes = parseInt(match[1], 10);
              // Add the delay in minutes to the date
              departureTime.setMinutes(departureTime.getMinutes() + delayMinutes);
          }
        }

        const line = station == 'alcantara_mar' || station == 'belem' ? 'CP Cascais Line' : 'Fertagus';

        console.log(train, departureTime);
        return { ...train, nextStop: station, departureTime, line };
      });
    })
    .flat()
    .filter((train: any) => {
      const tenMinAgo = new Date(Date.now() - 10 * MINUTE);
      const twentyMinAhead = new Date(Date.now() + 20 * MINUTE);
      return train.departureTime > tenMinAgo && train.departureTime < twentyMinAhead;
    });

    const trainMap: { [key: number]: any } = {};
    nextTrains.forEach((train: any) => {
      if (!trainMap[train.NComboio1]) {
        trainMap[train.NComboio1] = {
          number: train.NComboio1,
          line: train.line,
          destination: train.NomeEstacaoDestino,
          nextStop: train.nextStop,
          tmpTime: train.departureTime,
        };
      } else {
        const { tmpTime, ...prevTrain } = trainMap[train.NComboio1];
        const [departureTime, arrivalTime] = tmpTime < train.departureTime
          ? [tmpTime, train.departureTime]
          : [train.departureTime, tmpTime];
        
        
        trainMap[train.NComboio1] = {
          ...prevTrain,
          departureTime,
          arrivalTime,
        };
      }
    });

    const sortedTrains = Object.values(trainMap)
      .filter((train: any) => !train.tmpTime)
      .sort((a: any, b: any) => a.departureTime - b.departureTime);

    setTrains(sortedTrains);
  };

  useEffect(() => {
    refreshTrains();

    const interval = setInterval(refreshTrains, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      Trains
      <div>
        {trains.filter(train => isVisible(train) && train.line == 'Fertagus').map(train => (
          <Train key={train.number} train={train} />
        ))}
      </div>

      <label>
        <input type="checkbox" checked={showData} onChange={() => setShowData(!showData)} />
        Show data
      </label>

      {showData && (
        <ul>
          {trains.map(train => (
            <li key={train.number}>
              <div>🚂{train.number}: {getDirection(train)} - {train.line} - {train.destination}: {isVisible(train) && 'Visible'}</div>
              <pre>{formatTime(train.departureTime)} - {formatTime(train.arrivalTime)} ({percentage(train)})</pre>
              <Counter value={(train.arrivalTime.getTime() - Date.now()) / 60 / 1000} speed={-1/60} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
