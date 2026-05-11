import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Animated,
  Pressable,
} from 'react-native';

export default function loginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroLogin, setErroLogin] = useState('');

  // animação da LOGO
  const logoY = useRef(new Animated.Value(-80)).current;

  // animação dos inputs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  // animação do botão (hover)
  const scale = useRef(new Animated.Value(1)).current;
  const color = useRef(new Animated.Value(0)).current;

  // animação de SHAKE quando erro
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      // logo descendo
      Animated.spring(logoY, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),

      // inputs aparecendo
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function shakeTela() {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }

  function entrarHover() {
    Animated.parallel([
      Animated.timing(scale, { toValue: 1.05, duration: 150, useNativeDriver: true }),
      Animated.timing(color, { toValue: 1, duration: 150, useNativeDriver: false }),
    ]).start();
  }

  function sairHover() {
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.timing(color, { toValue: 0, duration: 150, useNativeDriver: false }),
    ]).start();
  }

  const corInterpolada = color.interpolate({
    inputRange: [0, 1],
    outputRange: ['#5cc6ba', '#49a89d'],
  });

  const fazerLogin = () => {
    if (email === 'lialillimm@gmail.com' && senha === '1234') {
      setErroLogin('');
      navigation.replace('Home');
    } else {
      setErroLogin('E-mail ou senha incorretos. Tente novamente.');
      shakeTela(); 
    }
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}>

      {/* LOGO DESCENDO */}
      <Animated.Image
        source={require('../assets/logo4.png')}
        style={[styles.logo, { transform: [{ translateY: logoY }] }]}
      />

      {/* FORMULÁRIO ANIMADO */}
      <Animated.View
        style={[
          styles.formArea,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >

        <TextInput
          placeholder="E-mail"
          style={styles.input}
          value={email}
          onChangeText={(valor) => {
            setEmail(valor);
            if (erroLogin) setErroLogin('');
          }}
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={(valor) => {
            setSenha(valor);
            if (erroLogin) setErroLogin('');
          }}
        />

        {!!erroLogin && <Text style={styles.mensagemErro}>{erroLogin}</Text>}

        <Pressable
          onHoverIn={entrarHover}
          onHoverOut={sairHover}
          onPress={fazerLogin}
          style={{ width: '100%', alignItems: 'center' }}
        >
          <Animated.View
            style={[
              styles.botao,
              {
                transform: [{ scale }],
                backgroundColor: corInterpolada,
              },
            ]}
          >
            <Text style={styles.textoBotao}>Acessar</Text>
          </Animated.View>
        </Pressable>

      </Animated.View>

      <View style={{ flex: 1 }} />

      <Text style={styles.rodape}>
        Não tenho uma conta. Toque para criar uma agora.
      </Text>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  logo: {
    width: 180,
    height: 70,
    resizeMode: 'contain',
  },

  formArea: {
    width: '100%',
    marginTop: 120,
    alignItems: 'center',
  },

  input: {
    width: '90%',
    height: 52,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  botao: {
    width: '90%',
    height: 52,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  mensagemErro: {
    width: '90%',
    color: '#c0392b',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
  },

  rodape: {
    marginBottom: 20,
    color: '#999',
    textAlign: 'center',
  },
});