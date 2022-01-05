import React, {useState, useContext} from 'react';
import BarberShopLogo from '../../assets/barberShopLogo.js';
import SignInput from '../../components/SignInput';
import EmailIcon from '../../assets/email.svg';
import PersonIcon from '../../assets/person.svg';
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
  const [form, setForm] = useState({name: '', email: '', password: ''});

  const onChangeText = (name, value) => {
    setForm({...form, [name]: value});
  };
  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'signin'}],
    });
  };
  const handleRegister = async () => {
    if ((form.name, form.email && form.password)) {
      const result = await Api.signUp(form);
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
        alert('email, e/ou senha errados');
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
          value={form.name}
          name="name"
          Icon={<PersonIcon width="24" height="24" fill="#268596" />}
          placeholder="Digite seu nome"
        />
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
        <CustomButton onPress={handleRegister}>
          <CustomButtonText>Registrar</CustomButtonText>
        </CustomButton>
      </InputArea>
      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
