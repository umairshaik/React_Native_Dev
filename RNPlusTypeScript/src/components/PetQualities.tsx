import {Text, View} from 'react-native';

type petQualProps = {
  qualities: {
    qualOne: string;
    qualTwo: string;
    qualThree: string;
    age: number;
  }[];
};

const PetQualities = (props: petQualProps) => {
  return (
    <View>
      {props.qualities.map((item, index) => {
        if (index === 0) {
          return (
            <Text>
              your pet is {item.qualOne}, {item.qualTwo}, {item.qualThree} and
              is {item.age} years old
            </Text>
          );
        }
        return (
          <Text>
            {' '}
            Also, your pet is {item.qualOne}, {item.qualTwo}, {item.qualThree}{' '}
            and is {item.age} years old
          </Text>
        );
      })}
    </View>
  );
};

export default PetQualities;
