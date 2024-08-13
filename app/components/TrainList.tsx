"use client"
import { useEffect, useState } from "react";
import { isPointInQuadrilateral, Point } from "../utils/geo";

const stations = [
  // "pragal",
  // "campolide",
  "alcantara_mar",
  "belem",
];

const MINUTE = 60 * 1000;

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

        console.log(train, departureTime);
        return { ...train, nextStop: station, departureTime };
      });
    })
    .flat()
    .filter((train: any) => train.departureTime > new Date() && train.departureTime < new Date(Date.now() + 30 * MINUTE));
    
    setTrains(nextTrains);
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
        {trains.map(train => <li>🚂<pre>{train.NComboio1} - {train.NomeEstacaoDestino} - {train.departureTime.toString()}</pre></li>)}
      </ul>
    </div>
  )
}
