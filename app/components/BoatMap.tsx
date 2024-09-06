import { LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { NavigationalStatus, shipTypes } from "../utils/boats";
import 'leaflet/dist/leaflet.css';

const tejo: LatLngTuple = [38.691220, -9.166467];

export default function BoatMap({ boats, metadata }: { boats: any[], metadata: any }) {
  return (
      <MapContainer center={tejo} zoom={13} scrollWheelZoom={false} style={{ height: 300, width: 300 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {boats.map(boat => {
          const { Longitude: lon, Latitude: lat } = boat.Message.PositionReport;
          const staticData = metadata[boat.MetaData.MMSI]?.Message.ShipStaticData;
          const size = staticData
            ? [staticData.Dimension.A + staticData.Dimension.B, staticData.Dimension.C + staticData.Dimension.D]
            : null;
          
          const moving = boat.Message.PositionReport.NavigationalStatus == NavigationalStatus.UnderWayUsingEngine
            || boat.Message.PositionReport.NavigationalStatus == NavigationalStatus.UnderWaySailing
            || boat.Message.PositionReport.NavigationalStatus == NavigationalStatus.RestrictedManeuverability;
        
          const shipType = staticData ? shipTypes[staticData.Type] || staticData.Type : null;
          const dataTimestamp = new Date(boat.MetaData.time_utc);
      
          return (
            <Marker key={boat.MetaData.MMSI} position={[lat, lon]}>
              <Popup>
                <strong>🚤 {boat.MetaData.ShipName} {!moving && ' - stationary'}</strong>
                <div>Speed: {boat.Message.PositionReport.Sog} knots</div>
                {staticData && (
                  <div>
                    <div>Type: {shipType}</div>
                    {size && (
                      <div>Length: {size[0]}m x Breadth: {size[1]}m</div>
                    )}
                  </div>
                )}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
  );
}
