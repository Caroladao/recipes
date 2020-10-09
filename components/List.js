import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import RecipeModal from './RecipeModal'
import colors from '../utils/Colors';

export default class List extends React.Component {
  state = {
    showRecipeVisible: false
  }

  toggleRecipeModal() {
    this.setState({ showRecipeVisible: !this.state.showRecipeVisible })
  }

  render() {
    const recipe = this.props.recipe;

    const ingredients = recipe.ingredients.length;
    const tasks = recipe.tasks.length;
    
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={ this.state.showRecipeVisible }
          onRequestClose={() => this.toggleRecipeModal() }
        >
          <RecipeModal 
            recipe={recipe} 
            closeModal={() => this.toggleRecipeModal()}
            // updateRecipe={this.props.updateRecipe} 
          />
        </Modal>

        <TouchableOpacity 
          style={[styles.listContainer, {borderLeftColor: recipe.category.color}]}
          onPress={() => this.toggleRecipeModal()}
        >
          <Text style={[styles.categoryName, {color: recipe.category.color}]} numberOfLines={1}>
            {recipe.category.name}
          </Text>
          <Text style={styles.listTitle} numberOfLines={1}>
            {recipe.name}
          </Text>

          <View style={styles.recipeData}>
            <View 
              style={styles.recipeNumber} 
              // onPress={() => this.toggleIngredientsModal()}
            >
              <Text style={{marginRight: 4}}>{ingredients}</Text>
              <Text style={styles.subtitle}>Ingredientes</Text>
            </View>

            <View 
              style={styles.recipeNumber}
              // onPress={() => this.toggleTasksModal()}
            >
              <Text style={{marginRight: 4}}>{tasks}</Text>
              <Text style={styles.subtitle}>Passos</Text>
            </View>
          </View>

          {/* <View>
            <TouchableOpacity style={styles.delete} >
              <MaterialIcons name="delete" size={24} color={colors.red} />
            </TouchableOpacity>
          </View> */}
          
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 0,
    marginVertical: 4,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderLeftWidth: 6,
    borderBottomRightRadius: 6,
    borderBottomColor: "#f5f5f5",
    width: 340,
  },
  listTitle: {
    marginTop: 6,
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 20,
    color: colors.black,
    textTransform: "capitalize"
  },
  categoryName: {
    fontSize: 12,
    color: 12,
    position: 'absolute',
    left: 16,
    top: 4,
    fontWeight: 'bold'
    // top: 0,
    // left: -1,
    // paddingLeft: 16,
    // paddingRight: 8,
    // color: '#fff',
    // borderTopRightRadius: 6,
    // borderBottomRightRadius: 6
  },
  recipeData: {
    justifyContent: "flex-start",
    flexDirection: 'row'
  },
  recipeNumber: {
    flexDirection: 'row',
    marginRight: 16
  },
  delete: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.red,
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
  }
})