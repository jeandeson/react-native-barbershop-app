import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_API = 'https://api.b7web.com.br/devbarber/api';

export default {
  checkToken: async token => {
    const req = await fetch(`${BASE_API}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
    });
    const json = req.json();
    return json;
  },

  signIn: async form => {
    const req = await fetch(`${BASE_API}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: form.email, password: form.password}),
    });
    const json = req.json();
    return json;
  },

  signUp: async form => {
    const req = await fetch(`${BASE_API}/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });
    const json = req.json();
    return json;
  },
  getBarbers: async (lat = null, lng = null, locationState = null) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const req = await fetch(
        `${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${locationState}`,
      );
      const result = await req.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
