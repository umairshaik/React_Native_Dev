/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Welcome from './components/Welcome';
import Pet from './components/Pets';
import PetQualities from './components/PetQualities';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const Message = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Welcome name="Umair" age={34} gender="Male" />
      <Pet petName={myPet} type="Dog" />
      <PetQualities qualities={qualities} />
    </SafeAreaView>
  );
};

const myPet = {
  firstName: 'Roger',
  lastName: 'Duggy',
};

const qualities = [
  {
    qualOne: 'a lizid',
    qualTwo: 'enormous',
    qualThree:
      'scary as a mother who caught her child eating her secrete stash of chocolate, fuck',
    age: 10,
  },
  {
    qualOne: 'Green',
    qualTwo: 'sometime yellow',
    qualThree: 'potentially purple',
    age: 17,
  },
];

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [] = useState<number>(12);

  return <Message />;
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
});

export default App;
