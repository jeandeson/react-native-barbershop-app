import React, {useState} from 'react';
import BarberShopLogo from '../../assets/barberShopLogo.js';
import SignInput from '../../components/SignInput';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import {useNavigation} from '@react-navigation/native';

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
    // navigation.navigate('signup');
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
