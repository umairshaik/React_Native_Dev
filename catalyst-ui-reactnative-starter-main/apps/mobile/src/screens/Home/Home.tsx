import {Text} from 'react-native';
import {useQuery} from 'react-query';
import {useTranslation} from 'react-i18next';
import {Suspense} from 'react';
import {AuthActions} from '../../api';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner';
import {useAuthContext} from '../../context/auth/authContext';
import {Container, StyledText} from './Home.style';

export type Props = {
  baseEnthusiasmLevel: number;
};

const User = () => {
  const {error, data} = useQuery('getUser', () => AuthActions.getUser(1), {
    // suspense: true,
  });
  if (error) return <Text>{`An error has occurred: ${error}`}</Text>;

  return <StyledText testID="welcome-user">Hello {data?.name}</StyledText>;
};

const Home = () => {
  const {logOut} = useAuthContext();
  const {t} = useTranslation();

  return (
    <Container>
      <StyledText testID="home">{t('HOME')}</StyledText>
      <Suspense fallback={<Spinner />}>
        <User />
      </Suspense>
      <Button accessibleProps="logout" text="Log out" onPress={logOut} />
    </Container>
  );
};
export default Home;
