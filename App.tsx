import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [barcodeValue, setBarcodeValue] = useState('');

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        barCodeScannerSettings={{
          interval: 200,
        }}
        onBarCodeScanned={(data) => {
          console.log(data);
          setBarcodeValue(data.data);
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>

      <View style={styles.resultContainer}>
        <View style={styles.viewResultTextContainer}>
          <Text style={styles.resultText}>Value</Text>
          <Text style={styles.resultText}>{barcodeValue}</Text>
        </View>
        <View style={styles.viewResultTextContainer}>
          <Text style={styles.resultText}>Length</Text>
          <Text style={styles.resultText}>{barcodeValue.length}</Text>
        </View>
      </View>
      <View>
        <Button
          title='Clear'
          onPress={() => {
            setBarcodeValue('');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  resultContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    justifyContent: 'center',
  },
  viewResultTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
