import React from "react";
import { Marker } from "react-map-gl";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const MarkerLabel = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background: white;
`;

const MarkerView = ({ waypoint, color = "#4a84eb" }) => {
  return (
    <Marker
      anchor="bottom"
      longitude={waypoint.coords.lng}
      latitude={waypoint.coords.lat}
    >
      <MarkerLabel>{waypoint.label}</MarkerLabel>
      <FontAwesomeIcon size={"2x"} color={color} icon={faLocationDot} />
    </Marker>
  );
};

export default React.memo(MarkerView);
