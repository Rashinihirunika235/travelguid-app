import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useState } from "react";

interface OfflineContextType {
  downloadedDistricts: string[];
  downloadDistrict: (id: string) => void;
  removeDownload: (id: string) => void;
  isDownloaded: (id: string) => boolean;
}

export const [OfflineProvider, useOffline] = createContextHook<OfflineContextType>(() => {
  const [downloadedDistricts, setDownloadedDistricts] = useState<string[]>([]);

  useEffect(() => {
    void AsyncStorage.getItem("downloadedDistricts").then((stored) => {
      if (stored) {
        setDownloadedDistricts(JSON.parse(stored));
      }
    });
  }, []);

  const downloadDistrict = useCallback((id: string) => {
    setDownloadedDistricts((prev) => {
      if (!prev.includes(id)) {
        const newDownloaded = [...prev, id];
        void AsyncStorage.setItem("downloadedDistricts", JSON.stringify(newDownloaded));
        return newDownloaded;
      }
      return prev;
    });
  }, []);

  const removeDownload = useCallback((id: string) => {
    setDownloadedDistricts((prev) => {
      const newDownloaded = prev.filter((d) => d !== id);
      void AsyncStorage.setItem("downloadedDistricts", JSON.stringify(newDownloaded));
      return newDownloaded;
    });
  }, []);

  const isDownloaded = useCallback((id: string) => downloadedDistricts.includes(id), [downloadedDistricts]);

  return useMemo(() => ({ 
    downloadedDistricts, 
    downloadDistrict, 
    removeDownload, 
    isDownloaded 
  }), [downloadedDistricts, downloadDistrict, removeDownload, isDownloaded]);
});
