import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function agendarScreen({ route, navigation }) {
  const { servico, clinica } = route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const horarios = ['09:00', '09:30', '10:00', '10:30'];

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const formatDateToKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateToBr = (date) => date.toLocaleDateString('pt-BR');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startWeekDay = firstDayOfMonth.getDay();

    const days = [];
    for (let i = 0; i < startWeekDay; i += 1) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      days.push(new Date(year, month, day));
    }
    return days;
  }, [currentMonth]);

  const confirmarReserva = () => {
    if (!selectedDate && !selectedTime) {
      setErrorMessage('Erro: selecione a data e o horário para continuar');
      return;
    }

    if (!selectedDate) {
      setErrorMessage('Erro: selecione uma data');
      return;
    }

    if (!selectedTime) {
      setErrorMessage('Erro: selecione um horário');
      return;
    }

    setErrorMessage('');

    const novaReserva = {
      id: String(Date.now()),
      titulo: servico.nome,
      clinica: clinica?.nome || 'Clínica Médica São Remo',
      data: formatDateToBr(new Date(`${selectedDate}T00:00:00`)),
      hora: `${selectedTime}h`,
      valor: `R$ ${servico.preco.toFixed(2).replace('.', ',')}`,
      endereco: clinica?.endereco || 'Endereço não informado',
      bairro: clinica?.bairro || 'Bairro não informado',
      telefone: clinica?.telefone || 'Telefone não informado',
      mostraAcoes: true,
    };

    navigation.navigate('Reservas', { novaReserva });
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.seta}>←</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Fazer uma reserva</Text>
      </View>

      {/* CONTEÚDO MAIS ABAIXO */}
      <View style={styles.conteudo}>
        <Text style={styles.label}>Data</Text>
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity
              onPress={() =>
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
                )
              }
            >
              <Text style={styles.calendarArrow}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.calendarTitle}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </Text>
            <TouchableOpacity
              onPress={() =>
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
                )
              }
            >
              <Text style={styles.calendarArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekHeader}>
            {weekDays.map((dayName) => (
              <Text key={dayName} style={styles.weekLabel}>{dayName}</Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {calendarDays.map((date, index) => {
              if (!date) {
                return <View key={`empty-${index}`} style={styles.dayCell} />;
              }

              const dateKey = formatDateToKey(date);
              const isSelected = selectedDate === dateKey;
              const isPast = date < today;

              return (
                <TouchableOpacity
                  key={dateKey}
                  style={[styles.dayCell, isSelected && styles.dayCellSelected]}
                  disabled={isPast}
                  onPress={() => {
                    setSelectedDate(dateKey);
                    setErrorMessage('');
                  }}
                >
                  <Text style={[styles.dayText, isPast && styles.dayTextDisabled, isSelected && styles.dayTextSelected]}>
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <Text style={styles.textoData}>
          {selectedDate ? `Data selecionada: ${formatDateToBr(new Date(`${selectedDate}T00:00:00`))}` : 'Selecione um dia no calendário'}
        </Text>

        <Text style={styles.label}>Horário</Text>

        <View style={styles.horariosArea}>
          {horarios.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.boxHorario,
                selectedTime === item && styles.boxHorarioAtivo
              ]}
              onPress={() => {
                setSelectedTime(item);
                setErrorMessage('');
              }}
            >
              <Text
                style={[
                  styles.txtHorario,
                  selectedTime === item && styles.txtHorarioAtivo
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* INFO À ESQUERDA */}
        <View style={styles.infoArea}>
          <Text style={styles.nomeServico}>{servico.nome}</Text>

          <Text style={styles.preco}>
            R$ {servico.preco.toFixed(2).replace('.', ',')}
          </Text>
        </View>

      </View>

      {!!errorMessage && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.botaoConfirmar}
        onPress={confirmarReserva}
      >
        <Text style={styles.txtConfirmar}>Confirmar reserva</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  header: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  botaoVoltar: {
    position: 'absolute',
    left: 0,
  },

  seta: {
    fontSize: 28,
    color: '#1cc4b1',
    fontWeight: 'bold',
  },

  titulo: {
    fontSize: 22,
    color: '#1cc4b1',
    fontWeight: 'bold',
  },

  conteudo: {
    marginTop: 24,
  },

  label: {
    fontSize: 18,
    color: '#555',
    marginBottom: 18,
  },

  calendarCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 20,
    maxWidth: 340,
    alignSelf: 'center',
  },

  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  calendarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },

  calendarArrow: {
    fontSize: 24,
    color: '#1cc4b1',
    paddingHorizontal: 8,
  },

  weekHeader: {
    flexDirection: 'row',
    marginBottom: 6,
  },

  weekLabel: {
    width: '14.28%',
    textAlign: 'center',
    color: '#666',
    fontWeight: '600',
    fontSize: 12,
  },

  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  dayCell: {
    width: '14.28%',
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },

  dayCellSelected: {
    backgroundColor: '#1cc4b1',
  },

  textoData: {
    fontSize: 14,
    color: '#555',
    marginBottom: 40,
  },

  dayText: {
    color: '#333',
    fontSize: 14,
  },

  dayTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },

  dayTextDisabled: {
    color: '#bbb',
  },

  horariosArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  boxHorario: {
    width: '23%',
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxHorarioAtivo: {
    backgroundColor: '#1cc4b1',
    borderColor: '#1cc4b1',
  },

  txtHorario: {
    fontSize: 14,
    color: '#555',
  },

  txtHorarioAtivo: {
    color: '#fff',
    fontWeight: 'bold',
  },

  infoArea: {
    marginTop: 32,
    alignItems: 'flex-start',
  },

  nomeServico: {
    fontSize: 20,
    color: '#666',
    textAlign: 'left',
  },

  preco: {
    fontSize: 26,
    color: '#1cc4b1',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'left',
  },

  botaoConfirmar: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    height: 54,
    borderRadius: 10,
    backgroundColor: '#1cc4b1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorBox: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#fdecec',
    borderWidth: 1,
    borderColor: '#f5b5b5',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  errorText: {
    color: '#c0392b',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },

  txtConfirmar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});