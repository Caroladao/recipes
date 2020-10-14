import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../utils/Colors';
import categories from '../utils/Categories';

export default class AddModal extends React.Component {
  state = {
    name: "",
    category: {
      name: "Bolos",
      color: "#5CD859"
    },
    ingredients: [],
    tasks: []
  }
  
  createRecipe = () => {
    const {name, category} = this.state;
    
    this.props.addRecipe({ name, category});

    this.setState({name: ""})
    this.props.closeModal();
  }

  renderCategories = () => {
    return categories.map(category => (
      <TouchableOpacity 
        key={category.name} 
        style={[styles.categorySelect, {backgroundColor: category.color}]} 
        onPress={() => this.setState({ category })}
      >
        <Text style={styles.categoryName}>{category.name}</Text>
      </TouchableOpacity>
    ))
  }

  render() {
    return (  
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity style={styles.closeModal} onPress={this.props.closeModal}>
          <MaterialIcons name="close" size={30} color={colors.black} />
        </TouchableOpacity>

        <View style={{alignSelf: "stretch", marginHorizontal: 32}}>
          <Text style={styles.title}>Criar Receita</Text>

          <TextInput 
            style={styles.input} 
            placeholder="Nome da Receita" 
            onChangeText={text => this.setState({name: text})} 
          />

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12, flexWrap: 'wrap' }} > 
            {this.renderCategories()} 
          </View>

          <TouchableOpacity 
            style={[styles.create, {backgroundColor: this.state.category.color}]}
            onPress={this.createRecipe}
          >
            <Text style={{color:colors.white, fontWeight: "bold"}}> Cadastrar </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModal: {
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute", 
    height: 40,
    right: 12,
    width: 40,
    top: 20, 
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.black,
    alignSelf: 'center',
    marginBottom: 16
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categorySelect: {
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 10,
    alignItems: 'center',
    height: 30,
    width: '30%',
  },
  categoryName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});