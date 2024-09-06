import asyncio
from datetime import datetime, timedelta
import httpx
import pytz

PRAGAL_ID = 9417087
CAMPOLIDE_ID = 9467033
ALCANTARA_MAR_ID = 9469039
BELEM_ID = 9469054

async def get_train_data():
    pragal_data, campolide_data, alcantara_mar_data, belem_data = await asyncio.gather(
        get_station(PRAGAL_ID),
        get_station(CAMPOLIDE_ID),
        get_station(ALCANTARA_MAR_ID),
        get_station(BELEM_ID)
    )
    
    return {
        "pragal": pragal_data,
        "campolide": campolide_data,
        "alcantara_mar": alcantara_mar_data,
        "belem": belem_data,
    }

async def get_station(station_id):
    tz = pytz.timezone('Europe/Lisbon')

    # date = datetime.now().strftime('%Y-%m-%d')
    time_30_minutes_ago = datetime.now(tz) - timedelta(minutes=30)
    time_1_hour_from_now = datetime.now(tz) + timedelta(hours=1)

    start_formatted = time_30_minutes_ago.strftime('%Y-%m-%d%%20%H:%M')
    end_formatted = time_1_hour_from_now.strftime('%Y-%m-%d%%20%H:%M')

    url = f"https://www.infraestruturasdeportugal.pt/negocios-e-servicos/partidas-chegadas/{station_id}/{start_formatted}/{end_formatted}/URB%7CSUBUR"
    async with httpx.AsyncClient() as client:
        response = await client.get(url, timeout=15.0)
        response.raise_for_status()
        return response.json()["response"]
