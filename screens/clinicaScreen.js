import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

export default function clinicaScreen({ route, navigation }) {
  const { clinica } = route.params;

  const servicos = [
    { nome: 'Consulta Dr. Alberto Souza', preco: 300 },
    { nome: 'Consulta Dra. Maria Alice', preco: 450 },
    { nome: 'Exame Mamografia', preco: 620 },
    { nome: 'Exame Ultrassom', preco: 270 },
  ];

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.topoImagem}>
        <Image
          source={require('../assets/foto-clinica.jpg')}
          style={styles.imagem}
        />

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.seta}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardClinica}>
        <Text style={styles.nomeClinica}>{clinica.nome}</Text>
        <Text style={styles.info}>{clinica.endereco}</Text>
        <Text style={styles.info}>{clinica.bairro}</Text>
        <Text style={styles.info}>{clinica.telefone}</Text>
      </View>

      <Text style={styles.tituloServico}>Serviços</Text>

      <View style={styles.lista}>
        {servicos.map((servico, index) => (
          <View key={index} style={styles.cardServico}>
            
            <View style={{ flex: 1 }}>
              <Text style={styles.nomeServico}>{servico.nome}</Text>

              <Text style={styles.preco}>
                R$ {servico.preco.toFixed(2).replace('.', ',')}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.botaoAgendar}
              onPress={() =>
                navigation.navigate('Agendar', { servico, clinica })
              }
            >
              <Text style={styles.txtBotao}>Agendar</Text>
            </TouchableOpacity>

          </View>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },

  topoImagem: {
    position: 'relative',
  },

  imagem: {
    width: '100%',
    height: 200,
  },

  botaoVoltar: {
    position: 'absolute',
    top: 20,
    left: 15,
    padding: 8,
  },

  seta: {
    fontSize: 30,
    color: '#1cc4b1',
    fontWeight: 'bold',
  },

  cardClinica: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },

  nomeClinica: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },

  info: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },

  tituloServico: {
    fontSize: 20,
    color: '#1cc4b1',
    fontWeight: 'bold',
    marginLeft: 14,
    marginBottom: 10,
  },

  lista: {
    paddingHorizontal: 12,
    paddingBottom: 30,
  },

  cardServico: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  nomeServico: {
    fontSize: 15,
    color: '#333',
    marginBottom: 5,
  },

  preco: {
    fontSize: 15,
    color: '#1cc4b1',
    fontWeight: 'bold',
  },

  botaoAgendar: {
    backgroundColor: '#1cc4b1',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 12,
  },

  txtBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});