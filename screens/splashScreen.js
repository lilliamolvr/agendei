import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';

export default function splashScreen({ navigation }) {

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <ActivityIndicator size="large" color="#ffffff" style={styles.loading} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5cc6ba',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  loading: {
    marginTop: 50,
  },
});