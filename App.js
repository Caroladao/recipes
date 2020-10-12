import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from './utils/Colors';
import List from './components/List';
import AddModal from './components/AddModal'

const height = Dimensions.get('window').height; //full height
export default class App extends React.Component {
  state = {
    addRecipeVisible: false,
    recipes: [{
      id: 1,
      name: "receita 1",
      category: {
        name: "Assados",
        color: "#24A6D9"
      },
      ingredients: [
        {
          title: "Dentes de Alho",
          completed: false
        },
        {
          title: "Sal",
          completed: false
        },
      ],
      tasks: [
        {
          title: "Coloque tudo no liquidificador e mexa bem e tal tal tal",
          completed: false
        },
        {
          title: "Deixe bater até ficar cremoso",
          completed: false
        }
      ]
    }],
  };

  addRecipe = recipe => {
    this.setState({recipes: [...this.state.recipes, {...recipe, id: this.state.recipes.length + 1, recipes:[] }] })
  }

  deleteRecipe = recipe => {
    const recipes = this.state.recipes
    recipes.splice(recipes.find(item => item.id == recipe.id)) 
    this.setState({recipes})
  }

  toggleAddRecipeModal() {
    this.setState({ addRecipeVisible: !this.state.addRecipeVisible });
  };

  renderList = item => {
    return <List recipe={item} updateRecipe={this.updateRecipe}/>;
  };

  updateRecipe = recipe => {
    this.setState({
      recipes: this.state.recipes.map(item => {
        return item.id === recipe.id ? recipe : item;
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={ this.state.addRecipeVisible }
          onRequestClose={() => this.toggleAddRecipeModal() }
        >
          <AddModal closeModal={() => this.toggleAddRecipeModal()} addRecipe={this.addRecipe}/>
        </Modal>

        <View style={{flexDirection: "row", marginTop: 64, marginBottom: 36}}>
          <View style={styles.divider} />
          <Text style={styles.title}>My<Text style={styles.title2}>Recipes</Text></Text>
          <View style={styles.divider} />
        </View>
  
        <TouchableOpacity style={styles.addItem} onPress={() => this.toggleAddRecipeModal()}>
          <MaterialIcons name="add" size={36} color={colors.white} />
        </TouchableOpacity>

        <View style={{marginBottom: 10, paddingHorizontal: 10, height: height - 174}}>
          <FlatList 
            data={this.state.recipes} 
            keyExtractor={ item => item.name } 
            horizontal={false} 
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => this.renderList(item)}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '300',
    color: colors.black,
    paddingHorizontal: 64,
  },
  title2: {
    fontWeight: 'bold',
    color: colors.blue,
  },
  addItem: {
    backgroundColor: colors.black,
    justifyContent: 'center',
    borderRadius: 60,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    bottom: 15,
    height: 60,
    width: 60,
    right: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 7,
  }
});
