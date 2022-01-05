import React, {useEffect, useState} from 'react';
import BarberItem from '../../components/BarberItem';
import {useNavigation} from '@react-navigation/native';
import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {Platform, RefreshControl} from 'react-native';
import Api from '../../Api';

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
  LoadingIcon,
  ListArea,
} from './styles';

export default () => {
  const navigation = useNavigation();

  const [locationState, setLocationState] = useState('');
  const [cords, setCords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [barberList, setBarberList] = useState([]);

  const handleLocationFinder = async () => {
    setCords(null);
    const result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    if (result === 'granted') {
      setLoading(true);
      setLocationState('');
      setBarberList([]);

      Geolocation.getCurrentPosition(info => {
        setCords(info.coords);
        getBarbers();
      });
    }
  };

  const onRefresh = () => {
    setRefreshing(false);
    getBarbers();
  };

  const getBarbers = async () => {
    setLoading(true);
    setBarberList([]);
    if (cords != null) {
      const res = await Api.getBarbers(
        cords.latitude,
        cords.longitude,
        locationState,
      );
      if (res.data) {
        if (res.loc) {
          setLocationState(res.loc);
        }
        setBarberList(res.data);
      } else {
        alert('error: ' + res.error);
      }
    } else {
      const res = await Api.getBarbers();
      if (res.data) {
        if (res.loc) {
          setLocationState(res.loc);
        }
        setBarberList(res.data);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    getBarbers();
  }, []);
  return (
    <Container>
      <Scroller
        RefreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HeaderArea>
          <HeaderTitle numberOfLine={2}>
            Encontre o seu barbeiro favorito
          </HeaderTitle>
          <SearchButton onPress={() => navigation.navigate('Search')}>
            <SearchIcon width="26" height="26" fill="#fff" />
          </SearchButton>
        </HeaderArea>
        <LocationArea>
          <LocationInput
            placeholder="Onde você está?"
            placeholderTextColor="#fff"
            value={locationState}
            onChangeText={text => setLocationState(text)}
          />
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill="#fff" />
          </LocationFinder>
        </LocationArea>
        {loading && <LoadingIcon size="large" color="#fff" />}
        <ListArea>
          {barberList.map((barber, index) => (
            <BarberItem key={index} barber={barber} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};
