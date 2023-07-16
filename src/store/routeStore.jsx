import { createContext, useState, useCallback, useEffect } from "react";

export const routeContext = createContext({
  waypoints: [],
});

const { Provider } = routeContext;

export const RouteProvider = ({ children }) => {
  const [waypoints, setWaypoints] = useState([]);
  const [route, setRoute] = useState(null);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    const fetchRoute = async () => {
      const waypointsStr = waypoints
        .map((_waypoint) => `${_waypoint.coords.lng},${_waypoint.coords.lat}`)
        .join(";");

      try {
        const query = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${waypointsStr}?steps=true&geometries=geojson&language=en&overview=full&access_token=sk.eyJ1IjoiZnNtcmMiLCJhIjoiY2xrNTNtYWlzMGUzdjNmbzdlMGdjcXBzcyJ9.iyQBoQm1d2qksAoWgmWKlw`,
          { method: "GET" }
        );
        const json = await query.json();
        if (json?.routes.length) {
          setRoute(json.routes[0]);
          setFetching(false);
        }
      } catch {
        //If Fetching route fails
        setFetching(false);
        alert("Failed to fetch route directions");
      }
    };

    if (waypoints.length >= 2) {
      setFetching(true);
      fetchRoute();
    }
  }, [waypoints]);

  const handleWaypointsReverse = useCallback(() => {
    setWaypoints((prevList) => prevList.slice().reverse());
  }, [waypoints]);

  return (
    <Provider
      value={{
        route,
        fetching,
        waypoints,
        setWaypoints,
        reverseWaypoints: handleWaypointsReverse,
      }}
    >
      {children}
    </Provider>
  );
};
