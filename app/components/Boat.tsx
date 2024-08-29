import { NavigationalStatus, shipTypes } from "../utils/boats";

export default function Boat({ boat, staticData, isVisible }: { boat: any, staticData: null | any, isVisible?: boolean }) {
  const size = staticData
    ? [staticData.Dimension.A + staticData.Dimension.B, staticData.Dimension.C + staticData.Dimension.D]
    : null;
  
  const moving = boat.Message.PositionReport.NavigationalStatus == NavigationalStatus.UnderWayUsingEngine
    || boat.Message.PositionReport.NavigationalStatus == NavigationalStatus.UnderWaySailing
    || boat.Message.PositionReport.NavigationalStatus == NavigationalStatus.RestrictedManeuverability;

  const shipType = staticData ? shipTypes[staticData.Type] || staticData.Type : null;

  if (isVisible && moving) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-[80px_100px_2fr_1fr_300px] bg-gray-800 text-white p-4 rounded-lg shadow-lg gap-4 md:gap-0 m-4">
        <div className="text-6xl md:row-span-2 flex items-center">🚤</div>
        <div className="text-2xl font-medium text-center md:row-span-2 flex items-center">-</div>
        <div className="text-3xl col-span-2 md:col-span-1 md:text-5xl font-bold md:row-span-2 flex items-center">
          {boat.MetaData.ShipName}
        </div>
        <div className="md:text-3xl text-center text-xl">Speed: {boat.Message.PositionReport.Sog} knots</div>
        <div className="md:col-start-4 md:row-start-2 md:text-2xl text-center text-xl">{shipType}</div>
        <div className="md:col-start-5 md:row-start-1 md:row-span-2 col-span-2 md:col-span-1 text-2xl md:text-2xl font-medium text-right flex justify-end items-center">
          -
        </div>
      </div>
    );
  }

  return (
    <div>
      <strong>🚤 {boat.MetaData.ShipName} {!moving && ' - stationary'}</strong>
      <div>Speed: {boat.Message.PositionReport.Sog} knots</div>
      {staticData && (
        <div>
          <div>Type: {shipTypes[staticData.Type]}</div>
          {size && (
            <div>Length: {size[0]}m x Breadth: {size[1]}m</div>
          )}
        </div>
      )}
      {/* <pre>{JSON.stringify(boat, null, 2)}</pre>
      <pre>X:{JSON.stringify(staticData, null, 2)}</pre> */}
    </div>
  )
}
