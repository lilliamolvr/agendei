import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';

const clinicas = [
  {
    id: '1',
    nome: 'Clínica São Gabriel',
    endereco: 'Av. Brasil, 1500',
    bairro: 'Jardins - São Paulo',
    telefone: '(11) 0000-0000',
  },
  {
    id: '2',
    nome: 'Clínica Médica São Remo',
    endereco: 'Av. Nove de Julho, 854',
    bairro: 'Centro - São Paulo',
    telefone: '(11) 0000-0000',
  },
  {
    id: '3',
    nome: 'Clínica Médica Assis',
    endereco: 'Rua Itapura, 695',
    bairro: 'Bela Vista - São Paulo',
    telefone: '(11) 0000-0000',
  },
  {
    id: '4',
    nome: 'Clínica Médica Integrada',
    endereco: 'Rua Cardoso de Almeida, 997',
    bairro: 'Perdizes - São Paulo',
    telefone: '(11) 0000-0000',
  },
];

export default function medicoScreen({ navigation }) {
  const [busca, setBusca] = useState('');

  const dadosFiltrados = clinicas.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase().trim())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTextArea}>
          <Text style={styles.headerTitle}>Explorar</Text>
          <Text style={styles.headerSubtitle}>Médico</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Pesquisar"
          placeholderTextColor="#9a9a9a"
          value={busca}
          onChangeText={setBusca}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={dadosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Clinica', { clinica: item })}
          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.info}>{item.endereco}</Text>
            <Text style={styles.info}>{item.bairro}</Text>
            <Text style={styles.info}>{item.telefone}</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={<View style={{ height: 85 }} />}
      />

      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.tabIconActive}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home', { focusSearch: true })}>
          <Text style={styles.tabIconActive}>🔎</Text>
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
    height: 88,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 34,
    color: '#5cc6ba',
    marginTop: -4,
  },
  headerTextArea: {
    flex: 1,
    alignItems: 'center',
    marginRight: 40,
  },
  headerTitle: {
    fontSize: 22,
    color: '#5cc6ba',
    fontWeight: '700',
    lineHeight: 28,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#9b9b9b',
    marginTop: 2,
    lineHeight: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  searchInput: {
    height: 50,
    borderRadius: 26,
    backgroundColor: '#e4e8e8',
    paddingHorizontal: 22,
    fontSize: 16,
    color: '#606060',
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  nome: {
    fontSize: 18,
    color: '#6f7d80',
    fontWeight: '700',
    marginBottom: 3,
  },
  info: {
    fontSize: 14,
    color: '#9a9a9a',
    lineHeight: 22,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    borderTopWidth: 1,
    borderTopColor: '#e2e2e2',
    backgroundColor: '#f4f4f4',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 27,
    color: '#d0d0d0',
  },
  tabIconActive: {
    fontSize: 27,
    color: '#b0b0b0',
  },
});