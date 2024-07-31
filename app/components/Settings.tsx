import { useRef, useState } from "react";

export default function Settings() {
  const [sleepLock, _setSleepLock] = useState(false);
  const wakeLock = useRef<null | WakeLockSentinel>(null);

  const setSleepLock = async (value: boolean) => {
    if (value) {
      wakeLock.current = await navigator.wakeLock.request("screen");
    } else {
      wakeLock.current?.release();
    }

    _setSleepLock(value);
  };

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
    </div>
  );
}
