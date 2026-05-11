import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function profileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>Maria Fernanda Lemos da Silva</Text>

        <Text style={[styles.label, { marginTop: 20 }]}>E-mail</Text>
        <Text style={styles.value}>lemmosfernanda3@gmail.com</Text>
      </View>

      {/* MENU CORRIGIDO */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.tabIcon}>🏠</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Home', { focusSearch: true })}>
          <Text style={styles.tabIcon}>🔎</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Reservas')}>
          <Text style={styles.tabIcon}>📅</Text>
        </TouchableOpacity>

        <Text style={styles.tabIconActive}>👤</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },

  header: {
    height: 84,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 14,
    position: 'relative',
  },

  backButton: {
    position: 'absolute',
    left: 12,
    bottom: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    fontSize: 32,
    color: '#5cc6ba',
    fontWeight: '700',
  },

  headerTitle: {
    fontSize: 22,
    color: '#5cc6ba',
    fontWeight: '700',
  },

  content: { flex: 1, paddingTop: 30, paddingHorizontal: 20 },

  label: { fontSize: 14, color: '#1f1f1f', marginBottom: 4 },

  value: {
    fontSize: 16,
    color: '#868686',
    fontWeight: '600',
    marginBottom: 20,
  },

  tabBar: {
    height: 72,
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  tabIcon: { fontSize: 26 },
  tabIconActive: { fontSize: 26 },
});