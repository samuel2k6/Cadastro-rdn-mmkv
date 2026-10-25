import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from '@rneui/themed';

import { storage } from '.src/storage/storage';

const Confirmacao = ({ route, navigation }) => {
const [dadosSalvos, setDadosSalvos] = useState(null);
const idUsuario = route.params?.usuario?.id;
useEffect(() => {
if (!idUsuario) {
console.warn('Nenhum ID de usuário foi recebido nesta rota.');
return;
}
// Leitura síncrona conectada à instância 'cadastro-rne-storage'
const dadosRaw = storage.getString(idUsuario);
if (dadosRaw) {
setDadosSalvos(JSON.parse(dadosRaw));
} else {
console.warn(`Nenhum dado encontrado para o ID: ${idUsuario}`);
}

}, [idUsuario]);
const IncluirNovamente = () => {
navigation.navigate('Cadastro');
};
return (
<View style={styles.container}>
<Text style={styles.title}>Dados do Cadastro Confirmados</Text>
{dadosSalvos ? (
<>
<Text style={styles.text}><Text style={styles.label}>ID:</Text> {dadosSalvos.id}</Text>
<Text style={styles.text}><Text style={styles.label}>Nome:</Text>
{dadosSalvos.nome}</Text>
<Text style={styles.text}><Text style={styles.label}>Email:</Text>
{dadosSalvos.email}</Text>
<Text style={styles.text}><Text style={styles.label}>Telefone:</Text>
{dadosSalvos.telefone}</Text>
<View style={styles.button}>
<Button title="Incluir novamente" color="blue" onPress={IncluirNovamente} />
</View>
</>
) : (
<Text style={styles.text}>Carregando dados do cadastro...</Text>
)}
</View>
);
};
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
padding: 20,
},
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 30,
color: '#333',
},
text: {
fontSize: 16,
marginBottom: 15,
},
label: {

fontWeight: 'bold',
color: '#555',
},
button: {
marginTop: 20,
marginBottom: 10,
},
});
export default Confirmacao;