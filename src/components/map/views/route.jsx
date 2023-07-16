import React from "react";
import { Source, Layer } from "react-map-gl";

const RouteView = ({ route }) => {
  return route ? (
    <Source
      id="my-route"
      type="geojson"
      data={{
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route.geometry.coordinates,
        },
      }}
    >
      <Layer
        {...{
          id: "my-route-line",
          type: "line",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "white",
            "line-width": 5,
          },
        }}
      />
    </Source>
  ) : null;
};

export default React.memo(RouteView);
