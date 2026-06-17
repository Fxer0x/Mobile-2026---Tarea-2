/**
 * Equivalente Android: BroadcastReceiver de CONNECTIVITY_CHANGE
 * Escucha cambios en la conectividad de red usando expo-network.
 */
import { useEffect, useState } from "react";
import * as Network from "expo-network";

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const check = async () => {
      const state = await Network.getNetworkStateAsync();
      setIsConnected(state.isConnected ?? true);
    };
    check();
    const interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, []);

  return { isConnected };
};
