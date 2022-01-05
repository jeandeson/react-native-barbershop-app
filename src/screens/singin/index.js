import React, {useState, useContext} from 'react';
import BarberShopLogo from '../../assets/barberShopLogo.js';
import SignInput from '../../components/SignInput';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import {useNavigation} from '@react-navigation/native';
import Api from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../../contexts/userContext';

import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext);
  const navigation = useNavigation();
  const [form, setForm] = useState({email: '', password: ''});

  const onChangeText = (name, value) => {
    setForm({...form, [name]: value});
  };
  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'signup'}],
    });
  };
  const handleJwtLogin = async () => {
    if (form.email && form.password) {
      const result = await Api.signIn(form);
      if (result.token) {
        await AsyncStorage.setItem('token', result.token);
        userDispatch({
          type: 'setAvatar',
          payload: {
            avatar: result.data.avatar,
          },
        });
        navigation.reset({
          routes: [{name: 'maintab'}],
        });
      } else {
        alert('email e/ou senha errados');
      }
    } else {
      alert('preencha os campos');
    }
  };

  return (
    <Container>
      <BarberShopLogo width={'100%'} height={250} />
      <InputArea>
        <SignInput
          onChangeText={onChangeText}
          value={form.email}
          name="email"
          Icon={<EmailIcon width="24" height="24" fill="#268596" />}
          placeholder="Digite seu email"
        />
        <SignInput
          onChangeText={onChangeText}
          value={form.password}
          name="password"
          Icon={<LockIcon width="24" height="24" fill="#268596" />}
          placeholder="Digite sua password"
          password={true}
        />
        <CustomButton onPress={handleJwtLogin}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>
      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>
          Ainda não possui uma conta?
        </SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
