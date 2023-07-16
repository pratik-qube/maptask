import React from "react";
import styled from "styled-components";
import CustomButton from "../sharedcomponents/button";
import { LocationRow } from "./common/locationRow";
import { routeContext } from "../../store/routeStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";

const ContentWrapper = styled.div`
  width: 200px;
  min-height: 46px;
  display: flex;
  background-color: white;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  @media (max-width: 800px) {
    /* top: 70px;
       left: 50px; */
  }
`;

const ExplorerTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;
const Title = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const WaypointListWrapper = styled.div``;

function Explorer() {
  const { waypoints, reverseWaypoints } = React.useContext(routeContext);
  return (
    <ContentWrapper>
      <ExplorerTitleWrapper>
        <Title>{"ROUTE DETAILS:"}</Title>
        <CustomButton onClick={reverseWaypoints}>
          <FontAwesomeIcon icon={faRepeat} />
        </CustomButton>
      </ExplorerTitleWrapper>
      <WaypointListWrapper>
        {waypoints.map((_waypoint, i) => (
          <LocationRow key={i}>
            <div>{`Location marker ${_waypoint.label}`}</div>
            <div
              style={{
                fontSize: 11,
                color: "grey",
              }}
            >{`Coords : ${_waypoint.coords.lat} : ${_waypoint.coords.lng}`}</div>
          </LocationRow>
        ))}
        {waypoints.length < 2 ? (
          <LocationRow disabled>
            {"Click on map to select location."}
          </LocationRow>
        ) : null}
      </WaypointListWrapper>
    </ContentWrapper>
  );
}

export default Explorer;
