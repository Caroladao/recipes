import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import RecipeModal from './RecipeModal'
import colors from '../utils/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

export default class List extends React.Component {
  state = {
    showRecipeVisible: false,
    dialogDeleteRecipe: false
  }

  toggleRecipeModal = () => {
    this.setState({ showRecipeVisible: !this.state.showRecipeVisible })
  }

  handleDialogDelete = () => {
    this.setState({ dialogDeleteRecipe: !this.state.dialogDeleteRecipe })
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
            updateRecipe={this.props.updateRecipe} 
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
            >
              <Text style={{marginRight: 4}}>{ingredients}</Text>
              <Text style={styles.subtitle}>Ingredientes</Text>
            </View>

            <View 
              style={styles.recipeNumber}
            >
              <Text style={{marginRight: 4}}>{tasks}</Text>
              <Text style={styles.subtitle}>Passos</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.delete} onPress={() => this.handleDialogDelete()} >
            <MaterialIcons name="delete" size={24} color={colors.black} />
          </TouchableOpacity>

          <View>
            <Dialog.Container visible={this.state.dialogDeleteRecipe}>
              <Dialog.Title>Deletar Receita?</Dialog.Title>
              <Dialog.Description>
                Você deseja mesmo deletar esta receita? Isso não poderá ser desfeito.
              </Dialog.Description>
              <Dialog.Button label="Cancel" onPress={() => this.handleDialogDelete()} />
              <Dialog.Button label="Delete" onPress={() => this.props.deleteRecipe(recipe)}/>
            </Dialog.Container>
          </View>
          
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
    position: 'absolute',
    alignItems: 'center',
    right: 0,
    top: 0,
    borderWidth: 2,
    borderColor: colors.black,
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
  }
})