import React from 'react';
import { Alert } from 'react-native';

const Button = ({
  title = 'myButton',
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <Button
      title={title}
      onPress={() => {
        onPress ? onPress() : Alert.alert('Button pressed');
      }}
    />
  );
};

export default Button;
