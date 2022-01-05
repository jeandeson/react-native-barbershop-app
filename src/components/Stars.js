import React from 'react';
import styled from 'styled-components/native';
import StarFull from '../assets/star.svg';
import StarEmpty from '../assets/star_empty.svg';
import StarHalf from '../assets/star_half.svg';

const StarArea = styled.View`
  flex-direction: row;
`;
const StarText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-left: 5px;
  color: #737373;
`;

const StarView = styled.View``;

export default ({stars, showNumber}) => {
  const s = [0, 0, 0, 0, 0];
  const floor = Math.floor(stars);
  const left = stars - floor;
  for (var i = 0; i < floor; i++) {
    s[i] = 2;
  }
  if (left > 0) {
    s[i] = 1;
  }
  return (
    <StarArea>
      {s.map((i, k) => (
        <StarView key={k}>
          {i === 0 && <StarEmpty width="18" height="18" fill="#ff9200" />}
          {i === 1 && <StarHalf width="18" height="18" fill="#ff9200" />}
          {i === 2 && <StarFull width="18" height="18" fill="#ff9200" />}
        </StarView>
      ))}
      {showNumber && <StarText>{stars}</StarText>}
    </StarArea>
  );
};
