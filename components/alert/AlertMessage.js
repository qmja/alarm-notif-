import { Alert } from 'react-native';

const AlertMessage = (onConfirm, onCancel) => {
  Alert.alert(
    'Confirmation',
    'Are you sure you want to exit? Changes will be discarded.',
    [
      {
        text: 'Cancel',
        onPress: onCancel,
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: onConfirm,
      },
    ],
    { cancelable: false }
  );
};

export default AlertMessage;
