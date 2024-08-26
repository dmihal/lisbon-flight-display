"use client";
import { useEffect, useRef } from "react";
import useLocalStorageState from "use-local-storage-state";

interface SettingsProps {
  showBoats: boolean;
  onShowBoats: (showBoats: boolean) => void;
  showTrains: boolean;
  onShowTrains: (showTrains: boolean) => void;
}

export default function Settings({ showBoats, onShowBoats, showTrains, onShowTrains }: SettingsProps) {
  const [sleepLock, _setSleepLock] = useLocalStorageState('sleepLock', { defaultValue: false });
  const wakeLock = useRef<null | WakeLockSentinel>(null);

  const setSleepLock = async (value: boolean) => {
    if (value) {
      wakeLock.current = await navigator.wakeLock.request("screen");
    } else {
      wakeLock.current?.release();
    }

    _setSleepLock(value);
  };

  useEffect(() => {
    if (sleepLock) {
      setSleepLock(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex flex-row items-center justify-center mt-8 space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={sleepLock}
            onChange={() => setSleepLock(!sleepLock)}
            className="mr-2"
          />
          Sleep Lock
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showBoats}
            onChange={e => onShowBoats(e.target.checked)}
            className="mr-2"
          />
          Show Boats
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showTrains}
            onChange={e => onShowTrains(e.target.checked)}
            className="mr-2"
          />
          Show Trains
        </label>
      </div>
    </div>
  );
}
