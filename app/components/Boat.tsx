import { NavigationalStatus, shipTypes } from "../utils/boats";

export default function Boat({ boat, staticData }: { boat: any, staticData: null | any }) {
  const size = staticData
    ? [staticData.Dimension.A + staticData.Dimension.B, staticData.Dimension.C + staticData.Dimension.D]
    : null;
  
  const moving = boat.Message.PositionReport.NavigationalStatus == NavigationalStatus.UnderWayUsingEngine || boat.Message.PositionReport.NavigationalStatus == NavigationalStatus.UnderWaySailing;

  return (
    <div>
      <strong>🚤 {boat.MetaData.ShipName} {!moving && ' - stationary'}</strong>
      <div>Speed: {boat.Message.PositionReport.Sog} knots - {boat.Message.PositionReport.NavigationalStatus}</div>
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
