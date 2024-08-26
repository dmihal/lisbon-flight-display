"use client"
import { useEffect, useState } from "react";
import { isPointInQuadrilateral, Point } from "../utils/geo";
import { Counter } from "./Counter";

const stations = [
  "pragal",
  "campolide",
  "alcantara_mar",
  "belem",
];

const MINUTE = 60 * 1000;

function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${formattedHours}:${formattedMinutes}`;
}

function isVisible(train: any): boolean {
  const percentage = (train.arrivalTime.getTime() - Date.now()) / (train.arrivalTime.getTime() - train.departureTime.getTime());

  switch (train.destination) {
    case 'CASCAIS':
      return percentage > 0.5 && percentage < 0.7;
    case 'CAIS DO SODRÉ':
      return percentage > 0 && percentage < 0.8;
    case 'COINA':
    case 'SETÚBAL':
      return percentage > 0.1 && percentage < 0.6;
    case 'ROMA-AREEIRO':
      return percentage > 0.2 && percentage < 0.6;
    default:
      return false;
  }
}


function getDirection(train: any): string {
  switch (train.destination) {
    case 'CASCAIS':
      return 'west';
    case 'CAIS DO SODRÉ':
      return 'east';
    case 'COINA':
    case 'SETÚBAL':
      return 'south';
    case 'ROMA-AREEIRO':
      return 'north';
    default:
      return '';
  }
}

const percentage = (train: any) => (train.arrivalTime.getTime() - Date.now()) / (train.arrivalTime.getTime() - train.departureTime.getTime());

export default function TrainList() {
  const [trains, setTrains] = useState<any[]>([]);

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

        const line = station == 'alcantara_mar' || station == 'belem' ? 'cascais' : 'fertagus';

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
      <ul>
        {trains.map(train => (
          <li>
            <div>🚂{train.number}: {getDirection(train)} - {train.line} - {train.destination}: {isVisible(train) && 'Visible'}</div>
            <pre>{formatTime(train.departureTime)} - {formatTime(train.arrivalTime)} ({percentage(train)})</pre>
            <Counter value={(train.arrivalTime.getTime() - Date.now()) / 60 / 1000} speed={-1/60} />
          </li>
        ))}
      </ul>
    </div>
  )
}
