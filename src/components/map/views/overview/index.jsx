import React from "react";
import { format, intervalToDuration } from "date-fns";
import styled from "styled-components";

const OverviewBar = styled.div`
  width: 80%;
  height: 46px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  justify-content: space-around;
`;

const StatWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
const StatLabel = styled.div`
  margin-right: 5px;
  @media (max-width: 800px) {
    font-size: 0.6rem;
  }
`;

const getDisplayDistance = (_distance) => {
  if (!_distance) return;
  const distanceInKm = (_distance / 1000).toFixed(2);
  return `${distanceInKm} Km`;
};

const zeroPad = (num) => String(num).padStart(2, "0");
const getDisplayDuration = (duration) => {
  const dur = intervalToDuration({
    start: 0,
    end: duration * 1000,
  });
  return (
    (dur.hours ? `${zeroPad(dur.hours)} hr` : "") +
    " " +
    (dur.minutes ? `${zeroPad(dur.minutes)} min` : "")
  );
};

function Overview({ distance, stops = 0, duration }) {
  return (
    <OverviewBar>
      <StatWrapper>
        <StatLabel>{"DISTANCE"}</StatLabel>
        {getDisplayDistance(distance)}
      </StatWrapper>
      {stops > 0 ? (
        <StatWrapper>
          <StatLabel>{"STOPS"}</StatLabel>
          {stops}
        </StatWrapper>
      ) : null}
      <StatWrapper>
        <StatLabel>{"DURATION"}</StatLabel>
        {getDisplayDuration(duration)}
      </StatWrapper>
    </OverviewBar>
  );
}

export default Overview;
