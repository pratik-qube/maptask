import React from "react";
import styled from "styled-components";
import { routeContext } from "../../store/routeStore";
import ControlToolbar from "./toolbar";
import Overview from "./views/overview";
import ReactMapGL, { Marker } from "react-map-gl";
import MarkerView from "./views/marker";
import RouteView from "./views/route";
import AcquiringGPS from "./views/acquiringGPS";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import "mapbox-gl/dist/mapbox-gl.css";

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: black;
`;

const ControlWrapper = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
`;

const OverviewWrapper = styled.div`
  position: absolute;
  bottom: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FetchingAlert = styled.div`
  padding: 10px;
  border-radius: 3px;
  background: whitesmoke;
  position: absolute;
  top: 50%;
  right: 5%;
`;

const TOKEN =
  "pk.eyJ1IjoiZnNtcmMiLCJhIjoiY2xrNTJyOW96MDExeDNnbnZyamwzZDdpMyJ9.a5p1toEKNsB9QioBfXFaJw";

const MapView = () => {
  const { waypoints, setWaypoints, route, fetching } = React.useContext(
    routeContext
  );
  const [currentLoc, setCurrentLoc] = React.useState(null);
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (geoPos) => {
        setCurrentLoc([geoPos.coords.longitude, geoPos.coords.latitude]);
        mapRef.current?.flyTo({
          center: [geoPos.coords.longitude, geoPos.coords.latitude],
          duration: 300,
          essential: true,
        });
      },
      () => {},
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, []);

  const duration = React.useMemo(() => {
    if (!route) return 0;
    return route.duration;
  }, [route]);
  const distance = React.useMemo(() => {
    if (!route) return 0;
    return route.distance;
  }, [route]);

  const handleMapOnClick = React.useCallback(
    (pointEvent) => {
      const pointLngLat = pointEvent.lngLat;
      setWaypoints([
        ...waypoints,
        {
          label: waypoints.length + 1,
          coords: {
            lat: pointLngLat.lat,
            lng: pointLngLat.lng,
          },
        },
      ]);
    },
    [waypoints]
  );

  const handleRecenterAction = React.useCallback(() => {
    currentLoc &&
      mapRef.current?.flyTo({
        center: [currentLoc[0], currentLoc[1]],
        duration: 300,
        essential: true,
      });
  }, [currentLoc]);

  const handleOnLoad = () => {};
  return currentLoc ? (
    <MapWrapper>
      <ReactMapGL
        ref={mapRef}
        initialViewState={{
          longitude: currentLoc[0],
          latitude: currentLoc[1],
          zoom: 13.5,
        }}
        onClick={handleMapOnClick}
        mapStyle="mapbox://styles/fsmrc/clk52v3ve004x01nwatgl24or"
        mapboxAccessToken={TOKEN}
      >
        <Marker
          anchor="bottom"
          longitude={currentLoc[0]}
          latitude={currentLoc[1]}
        >
          <FontAwesomeIcon color={"#329ef4"} icon={faCircle} />
        </Marker>
        <RouteView route={route} />
        {waypoints.map((_waypoint, i) => (
          <MarkerView
            key={i}
            waypoint={_waypoint}
            color={
              i == 0 ? "green" : i == waypoints.length - 1 ? "red" : undefined
            }
          />
        ))}
      </ReactMapGL>
      <ControlWrapper>
        <ControlToolbar
          mapRef={mapRef}
          waypoints={waypoints}
          onRecenter={handleRecenterAction}
        />
      </ControlWrapper>
      {route && (
        <OverviewWrapper>
          <Overview
            distance={distance}
            duration={duration}
            stops={waypoints.length - 2 > 0 ? waypoints.length - 2 : 0}
          />
        </OverviewWrapper>
      )}
      {fetching && <FetchingAlert>Fetching Directions ...</FetchingAlert>}
    </MapWrapper>
  ) : (
    <AcquiringGPS />
  );
};

export default MapView;
