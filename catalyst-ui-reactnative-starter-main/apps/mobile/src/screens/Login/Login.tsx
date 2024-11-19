import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import {useAuthContext} from '../../context/auth/authContext';
import {
  Container,
  StyledLogoText,
  StyledSafeAreaContainer,
  StyledIcon,
} from './Login.style';

const Login = () => {
  const {logIn} = useAuthContext();
  const {t} = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginText: string = t('LOGIN');
  const passwordTxt: string = t('PASSWORD');
  const usernameTxt: string = t('USERNAME');
  const handleLogin = async () => {
    await logIn?.({username, password});
  };
  return (
    <StyledSafeAreaContainer>
      <Container>
        <LanguageSelector />
        <StyledLogoText testID="welcome-message">
          {t('WELCOME_TEXT')}
        </StyledLogoText>

        <InputField
          accessiblilityProps="username"
          logo={<StyledIcon name="person" />}
          placeholder={usernameTxt}
          value={username}
          onChangeText={setUsername}
        />

        <InputField
          accessiblilityProps="password"
          logo={<StyledIcon name="lock" />}
          placeholder={passwordTxt}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          editable={false}
        />

        <Button
          accessibleProps="login-button"
          text={loginText}
          onPress={() => handleLogin()}
        />
      </Container>
    </StyledSafeAreaContainer>
  );
};
export default Login;
