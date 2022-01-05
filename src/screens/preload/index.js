import React, {useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Container, LoadingIcon} from './styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarberShopLogo from '../../assets/barberShopLogo.js';
import Api from '../../Api';
import {UserContext} from '../../contexts/userContext';

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext);
  const navigation = useNavigation();
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const result = await Api.checkToken(token);
        if (result.token) {
          await AsyncStorage.setItem('token', result.token);
          userDispatch({
            type: 'setAvatar',
            payload: {
              avatar: result.data.avatar,
            },
          });
          navigation.navigate('maintab');
        } else {
          navigation.navigate('signin');
        }
      } else {
        navigation.navigate('signin');
      }
    };
    checkToken();
  }, []);
  return (
    <Container>
      <BarberShopLogo width={'100%'} height={250} />
      <LoadingIcon size="large" color="#fff" />
    </Container>
  );
};
