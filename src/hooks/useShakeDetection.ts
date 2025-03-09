
import { useState, useEffect, useCallback } from "react";

type ShakeCallback = () => void;

export const useShakeDetection = (
  enabled: boolean,
  onShake: ShakeCallback,
  threshold = 15
) => {
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [lastZ, setLastZ] = useState(0);
  
  const handleDeviceMotion = useCallback(
    (event: DeviceMotionEvent) => {
      if (!enabled) return;
      
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration || acceleration.x === null || acceleration.y === null || acceleration.z === null) return;
      
      const currentX = acceleration.x;
      const currentY = acceleration.y;
      const currentZ = acceleration.z;
      
      const deltaX = Math.abs(lastX - currentX);
      const deltaY = Math.abs(lastY - currentY);
      const deltaZ = Math.abs(lastZ - currentZ);
      
      if ((deltaX > threshold && deltaY > threshold) || 
          (deltaX > threshold && deltaZ > threshold) || 
          (deltaY > threshold && deltaZ > threshold)) {
        onShake();
      }
      
      setLastX(currentX);
      setLastY(currentY);
      setLastZ(currentZ);
    },
    [enabled, lastX, lastY, lastZ, onShake, threshold]
  );
  
  useEffect(() => {
    if (typeof window !== "undefined" && typeof DeviceMotionEvent !== "undefined") {
      window.addEventListener("devicemotion", handleDeviceMotion);
      
      return () => {
        window.removeEventListener("devicemotion", handleDeviceMotion);
      };
    }
  }, [handleDeviceMotion]);
  
  return null;
};
