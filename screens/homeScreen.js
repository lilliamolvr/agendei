import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

const categorias = [
  { nome: 'Médico', icone: '🧑‍⚕️' },
  { nome: 'Dentista', icone: '🦷' },
  { nome: 'Cabeleireiro', icone: '💈' },
  { nome: 'Personal', icone: '🏋️' },
  { nome: 'Petshop', icone: '🐶' },
  { nome: 'Pilates', icone: '🧘' },
  { nome: 'Manicure', icone: '💅' },
  { nome: 'Nutricionista', icone: '🍎' },
  { nome: 'Lava Car', icone: '🚗' },
];

export default function homeScreen({ navigation, route }) {
  const [cidade, setCidade] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (route?.params?.focusSearch) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [route?.params]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo4.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.titulo}>Agende os seus serviços</Text>

        <View style={styles.searchBox}>
          <TextInput
            ref={inputRef}
            placeholder="Qual cidade você está?"
            placeholderTextColor="#a8a8a8"
            style={styles.input}
            value={cidade}
            onChangeText={setCidade}
            autoCorrect={false}
            autoCapitalize="words"
            returnKeyType="search"
            underlineColorAndroid="transparent"
            autoComplete="off"
            importantForAutofill="no"
          />

          <Image
            source={require('../assets/pin.png')}
            style={styles.pinImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.grid}>
          {categorias.map((item) => (
            <TouchableOpacity
              key={item.nome}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => {
                if (item.nome === 'Médico') {
                  navigation.navigate('Medico');
                }
              }}
            >
              <Text style={styles.emoji}>{item.icone}</Text>
              <Text style={styles.cardText}>{item.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.tabIcon}>🏠</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => inputRef.current?.focus()}>
          <Text style={styles.tabIcon}>🔎</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Reservas')}>
          <Text style={styles.tabIcon}>📅</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.tabIconActive}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },

  header: {
    height: 84,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4',
    paddingBottom: 16,
  },

  logoImage: {
    width: 190,
    height: 44,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
  },

  titulo: {
    fontSize: 22,
    color: '#3f3f3f',
    fontWeight: '300',
    marginBottom: 18,
    textAlign: 'center',
  },

  searchBox: {
    backgroundColor: '#e7eaea',
    borderRadius: 24,
    height: 54,
    marginBottom: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    height: '100%',
    fontSize: 18,
    color: '#555',
    backgroundColor: 'transparent',
    borderWidth: 0,

    ...(Platform.OS === 'web'
      ? {
          outlineStyle: 'none',
          boxShadow: 'none',
        }
      : {}),
  },

  pinImage: {
    width: 20,
    height: 24,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '31%',
    backgroundColor: '#e7eaea',
    borderRadius: 18,
    height: 112,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  emoji: {
    fontSize: 30,
    marginBottom: 7,
  },

  cardText: {
    fontSize: 15,
    color: '#5f6b6f',
    textAlign: 'center',
  },

  tabBar: {
    height: 72,
    borderTopWidth: 1,
    borderTopColor: '#e2e2e2',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  tabIcon: {
    fontSize: 27,
    color: '#c6c6c6',
  },

  tabIconActive: {
    fontSize: 27,
    color: '#6c63ff',
  },
});