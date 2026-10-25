import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, Input } from '@rneui/themed';

import { storage } from './src/storage/Storage';

const Cadastro = ({ navigation }) => {
const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const [telefone, setTelefone] = useState('');
const [senha, setSenha] = useState('');
const [erros, setErros] = useState({
nome: '',
email: '',
telefone: '',
senha: '',
});
const validarCampos = () => {
let errosTemp = {};
if (!nome) {
errosTemp.nome = 'Digite seu nome';
}
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!email) {
errosTemp.email = 'Digite seu email';
} else if (!regexEmail.test(email)) {
errosTemp.email = 'Digite um e-mail válido (ex: nome@dominio.com)';
}
if (!telefone) {
errosTemp.telefone = 'Digite seu telefone';
}
if (!senha) {
errosTemp.senha = 'Digite sua senha';
} else if (senha.length < 6) {
errosTemp.senha = 'A senha deve ter no mínimo 6 caracteres';
}
setErros(errosTemp);
return Object.keys(errosTemp).length === 0;
};
const handleSalvar = () => {

const dados = {
id: '0',
nome: nome,
email: email,
telefone: telefone,
senha: senha,
};
if (validarCampos()) {
dados.id = Math.floor(Math.random() * 10000) + '';
// Escrita síncrona usando a instância customizada do MMKV
storage.set(dados.id, JSON.stringify(dados));
console.log('Dados salvos no MMKV isolado com sucesso!');
navigation.navigate('Confirmacao', { usuario: { id: dados.id } });
}
};
return (
<ScrollView>
<View style={styles.formContainer}>
{!!erros.nome && <Text style={styles.erro}>{erros.nome}</Text>}
<Text style={styles.label}>Nome:</Text>
<Input style={styles.input} value={nome} onChangeText={setNome}
placeholder="Digite seu nome" maxLength={100} />
{!!erros.email && <Text style={styles.erro}>{erros.email}</Text>}
<Text style={styles.label}>Email:</Text>
<Input style={styles.input} value={email} onChangeText={setEmail}
placeholder="Digite seu email" maxLength={100} keyboardType="email-address"
autoCapitalize="none" />
{!!erros.telefone && <Text style={styles.erro}>{erros.telefone}</Text>}
<Text style={styles.label}>Telefone:</Text>
<Input style={styles.input} value={telefone} onChangeText={setTelefone}
placeholder="Digite seu telefone" maxLength={11} keyboardType="numeric" />
{!!erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}
<Text style={styles.label}>Senha:</Text>
<Input style={styles.input} value={senha} onChangeText={setSenha}
placeholder="Digite sua senha" maxLength={1000} secureTextEntry={true} />
<Button title="Salvar" onPress={handleSalvar} />
</View>
</ScrollView>
);
};

const styles = StyleSheet.create({
formContainer: {
flex: 1,
padding: 20,
paddingTop: 30,
},
input: {
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 5,
padding: 10,
marginBottom: 10,
},
erro: {
color: 'red',
marginBottom: 5,
},
});

export default Cadastro;