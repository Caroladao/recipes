import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Modal, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from './src/utils/Colors';
import List from './src/components/List';
import AddModal from './src/components/AddModal'
import Fire from './src/services/Fire'

const height = Dimensions.get('window').height; //full height
export default class App extends React.Component {
  state = {
    addRecipeVisible: false,
    recipes: [],
    user: {},
    loading: true,
    dialogDeleteRecipe: false
  };

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if(error) {
        return alert("Oops, parece que algo deu errado :c");
      }

      firebase.getRecipes( recipes => {
        this.setState({recipes, user}, () => {  
          this.setState({ loading: false });
        });
      });

      this.setState({user})
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  addRecipe = recipe => {
    firebase.addRecipe({
      name: recipe.name,
      category: recipe.category,
      ingredients: [],
      tasks: []
    })
  }

  updateRecipe = recipe => {
    firebase.updateRecipe(recipe);
  };

  deleteRecipe = recipe => {
    firebase.deleteRecipe(recipe);
  };

  toggleAddRecipeModal = () => {
    this.setState({ addRecipeVisible: !this.state.addRecipeVisible });
  };

  renderList = item => 
    <List recipe={item} updateRecipe={this.updateRecipe} deleteRecipe={this.deleteRecipe} />;

  render() {
    if( this.state.loading ) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      )
    }
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

        { this.state.recipes.length === 0 ?
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <Text style={styles.noRecipes}>Você ainda não tem receitas cadastradas</Text>
          </View>
        :
        <View style={{marginBottom: 10, paddingHorizontal: 10, height: height - 174}}>
          <FlatList 
            data={this.state.recipes} 
            keyExtractor={ item => item.id.toString() } 
            horizontal={false} 
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => this.renderList(item)}
            />

          
        </View>

        }
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
  noRecipes: {
    fontWeight: 'bold',
    fontSize: 24
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
