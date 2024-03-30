import {Text, View} from 'react-native';

type PetProps = {
  petName: {
    firstName: string;
    lastName: string;
  };
  type: string;
};

const Pet = (props: PetProps) => {
  const {firstName, lastName} = props.petName;
  return (
    <View>
      <Text>
        you own a pet named {firstName} {lastName}
      </Text>
      <Text>The pet is of type: {props.type}</Text>
    </View>
  );
};

export default Pet;
