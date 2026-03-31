import { useAuth } from "@clerk/react";
import { useEffect } from "react";
import api from "../lib/axios";

let isIntercepterRegistered = false;

function useAuthReq() {
  const { isSignedIn, getToken, isLoaded } = useAuth();

  // inlcude the tocken to the req headers
  useEffect(() => {
    if (isIntercepterRegistered) return;
    isIntercepterRegistered = true;
    const intercepter = api.interceptors.request.use(async (config) => {
      if (isSignedIn) {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    });

    //clean up method
    return () => {
      api.interceptors.request.eject(intercepter);
      isIntercepterRegistered = false;
    };
  }, [isSignedIn, getToken]);

  return { isSignedIn: isSignedIn, isClerkLoaded: isLoaded };
}

export default useAuthReq;
