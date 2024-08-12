"use client";
import { useEffect, useRef } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function Settings({ showBoats, onShowBoats }: { showBoats: boolean; onShowBoats: (showBoats: boolean) => void }) {
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
      <div className="flex flex-col items-center justify-center mt-8">
        <label className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={sleepLock}
            onChange={() => setSleepLock(!sleepLock)}
            className="mr-2"
          />
          Sleep Lock
        </label>
      </div>
      <div className="flex flex-col items-center justify-center mt-8">
        <label className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={showBoats}
            onChange={e => onShowBoats(e.target.checked)}
            className="mr-2"
          />
          Show Boats
        </label>
      </div>
    </div>
  );
}
