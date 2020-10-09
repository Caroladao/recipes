import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, FlatList } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import colors from '../utils/Colors'

export default class recipeModal extends React.Component {

  toggleIngredientCompleted = index => {
    let recipe = this.props.recipe;
    recipe.ingredients[index].completed = !recipe.ingredients[index].completed;

    // this.props.updateRecipe( recipe );   
  }

  renderIngredients = (item, index) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => this.toggleIngredientCompleted(index)}>
          <Ionicons 
            name={item.completed ? 'ios-checkbox' : 'ios-square-outline'}
            size={28} 
            color={colors.grey} 
            style={{ width: 32 }} 
          />
        </TouchableOpacity>
        <Text 
          style={[styles.itemList, {textDecorationLine: item.completed ? 'line-through' : 'none', color: item.completed ? colors.grey : colors.black}]}
        >
          {item.title}
        </Text>
        <TouchableOpacity 
          // onPress={() => this.deleteItem( index )}
          style={styles.deleteButton}
        >
          <Text style={{color: colors.white, fontWeight: 'bold'}}> Delete </Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  render() {
    const recipe = this.props.recipe;

    const ingredients = recipe.ingredients;
    const tasks = recipe.tasks;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity style={styles.closeModal} onPress={this.props.closeModal}>
          <MaterialIcons name="close" size={30} color={colors.black} />
        </TouchableOpacity>

        <View style={[styles.header, {borderBottomColor: recipe.category.color}]}>
          <Text style={[styles.category, {color: recipe.category.color}]}>
            {recipe.category.name}
          </Text>
          <Text style={[styles.title, {color: recipe.category.color}]}>
            {recipe.name}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.itemTitle}>
            Ingredients
          </Text>
          <FlatList 
            data={ingredients} 
            renderItem={({item, index}) => this.renderIngredients(item, index)}
            keyExtractor={ item => item.title }
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.itemTitle}>
            Tasks
          </Text>
          <FlatList 
            data={tasks} 
            renderItem={({item, index}) => this.renderIngredients(item, index)}
            keyExtractor={ item => item.title }
            showsVerticalScrollIndicator={false}
          />
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
    justifyContent: 'flex-start',
    paddingTop: 24,
    paddingHorizontal: 16
  },
  closeModal: {
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute", 
    zIndex: 1,
    height: 40,
    right: 12,
    width: 40,
    top: 20, 
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderBottomWidth: 4,
    marginHorizontal: 10,
    width: '100%',
    paddingRight: 40,
    paddingBottom: 10,
  },
  category: {
    fontWeight: 'bold',
  }, 
  title: {
    textTransform: 'capitalize',
    fontSize: 28,
    fontWeight: 'bold',
  },
  section: {
    paddingVertical: 15,
    width: '100%'
  },
  itemTitle: {
    fontSize: 20,
    paddingBottom: 8,
    fontWeight: 'bold'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  itemList: {
    flex: 1,
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingRight: 85
  },
  deleteButton: {
    flex: 1,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    position: 'absolute',
    right: 32,
    height: 30,
    borderRadius: 4
  }
});