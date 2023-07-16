import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import MapView from "./components/map";
import { RouteProvider, routeContext } from "./store/routeStore";
import LocationExplorer from "./components/routeexplorer";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const ExplorerWrapper = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
`;

function App() {
  const { waypoints, setWaypoints, reverseWaypoints } = React.useContext(
    routeContext
  );

  return (
    <RouteProvider>
      <Container>
        <MapView waypoints={waypoints} setWaypoints={setWaypoints} />
        <ExplorerWrapper>
          <LocationExplorer
            waypoints={waypoints}
            onReverse={reverseWaypoints}
          />
        </ExplorerWrapper>
      </Container>
    </RouteProvider>
  );
}

export default App;
