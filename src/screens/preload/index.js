import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Container, LoadingIcon} from './styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarberShopLogo from '../../assets/barberShopLogo.js';

export default () => {
  const navigation = useNavigation();
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        //validar token
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
