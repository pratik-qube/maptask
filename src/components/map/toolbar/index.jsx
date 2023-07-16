import React from "react";
import styled from "styled-components";
import turfLine from "turf-linestring";
import turfBBox from "@turf/bbox";
import CustomButton from "../../sharedcomponents/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faExpand,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecenterBtn = styled(CustomButton)`
  margin-top: 10px;
`;

function ControlToolbar({ mapRef, waypoints, onRecenter }) {
  const handleZoomIn = () => {
    mapRef.current &&
      mapRef.current.setZoom(Math.min(mapRef.current.getZoom() + 0.5, 15));
  };
  const handleZoomOut = () => {
    mapRef.current &&
      mapRef.current.setZoom(Math.max(mapRef.current.getZoom() - 0.5, 4));
  };
  const handleOverview = () => {
    const lineStr = turfLine(
      waypoints.map((_way) => [_way.coords.lng, _way.coords.lat])
    );
    const bbox = turfBBox(lineStr);
    mapRef.current &&
      mapRef.current.fitBounds(bbox, {
        padding: 100,
      });
  };
  return (
    <Wrapper>
      <CustomButton onClick={handleZoomIn}>
        <FontAwesomeIcon icon={faPlus} />
      </CustomButton>
      <CustomButton onClick={handleZoomOut}>
        <FontAwesomeIcon icon={faMinus} />
      </CustomButton>
      <CustomButton onClick={handleOverview}>
        <FontAwesomeIcon icon={faExpand} />
      </CustomButton>
      <RecenterBtn onClick={onRecenter}>
        <FontAwesomeIcon icon={faLocationCrosshairs} />
      </RecenterBtn>
    </Wrapper>
  );
}

export default ControlToolbar;
