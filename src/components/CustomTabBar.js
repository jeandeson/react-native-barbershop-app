import React from 'react';
import styled from 'styled-components/native';
import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';
import TodayIcon from '../assets/today.svg';

const TabArea = styled.View`
  height: 60px;
  background-color: #4eadbe;
  flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 35px;
  border: 3px solid #4eadbe;
  margin-top: -20px;
`;

export default ({state, navigation}) => {
  const goTo = screenName => {
    navigation.navigate(screenName);
  };
  return (
    <TabArea>
      <TabItem onPress={() => goTo('Home')}>
        <HomeIcon
          style={{opacity: state.index === 0 ? 1 : 0.7}}
          width="24"
          height="24"
          fill="#fff"
        />
      </TabItem>
      <TabItem onPress={() => goTo('Search')}>
        <SearchIcon
          style={{opacity: state.index === 1 ? 1 : 0.7}}
          height="24"
          width="24"
          fill="#fff"
        />
      </TabItem>
      <TabItemCenter onPress={() => goTo('Appointments')}>
        <TodayIcon height="32" width="32" fill="#4eadbe" />
      </TabItemCenter>
      <TabItem onPress={() => goTo('Favorites')}>
        <FavoriteIcon
          style={{opacity: state.index === 3 ? 1 : 0.7}}
          height="24"
          width="24"
          fill="#fff"
        />
      </TabItem>
      <TabItem onPress={() => goTo('Profile')}>
        <AccountIcon
          style={{opacity: state.index === 4 ? 1 : 0.7}}
          height="24"
          width="24"
          fill="#fff"
        />
      </TabItem>
    </TabArea>
  );
};
