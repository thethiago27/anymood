import mixpanel from "mixpanel-browser";
import { useEffect } from "react";

mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN);
export const track = (event: string, properties?: any) => {
  mixpanel.track(event, properties);
};

export const trackIdentify = (id: string) => {
  mixpanel.identify(id);
};

export const trackIncrement = (event: string, properties?: any) => {
  mixpanel.people.increment(event, properties);
};

export const useTrack = (event: string, properties?: any) => {
  useEffect(() => {
    track(event, properties);
  }, []);
};
