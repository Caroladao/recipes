import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, FlatList, Animated } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import colors from '../utils/Colors'
import DialogInput from 'react-native-dialog-input';

export default class recipeModal extends React.Component {
  state = {
    isDialogVisible: {
      ingredients: false,
      tasks: false
    }
  }

  handleDialogVisible = (type) => {
    const dialog = this.state.isDialogVisible
    dialog[type] = !this.state.isDialogVisible[type]

    this.setState({ isDialogVisible: dialog })
  };

  toggleItemCompleted = (index, type) => {
    let recipe = this.props.recipe
    recipe[type][index].completed = !recipe[type][index].completed

    this.props.updateRecipe(recipe)
  }

  addItem = (text, type) => {
    let recipe = this.props.recipe
    recipe[type].push({title: text, completed: false})

    this.props.updateRecipe(recipe)

    this.setState({ isDialogVisible: {
      ingredients: false,
      tasks: false
    } })
  }

  deleteItem = (index, type) => {
    let recipe = this.props.recipe;
    recipe[type].splice(index, 1);

    this.props.updateRecipe(recipe);
  }

  renderItems = (item, index, type) => 
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => this.toggleItemCompleted(index, type)}>
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
        onPress={() => this.deleteItem( index, type )}
        style={styles.deleteButton}
      >
        <Text style={{fontWeight: 'bold'}}> Delete </Text>
      </TouchableOpacity>
    </View>
  
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
            renderItem={({item, index}) => this.renderItems(item, index, 'ingredients')}
            keyExtractor={ item => item.title }
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.addItemButton}
              onPress={() => this.handleDialogVisible('ingredients')}
            >
              <MaterialIcons name="add" size={24} color={colors.black} />
              <Text>Add ingredient</Text>
            </TouchableOpacity>
          </View>

          <DialogInput 
            isDialogVisible={this.state.isDialogVisible.ingredients}
            title={`Add ingredient`}
            hintInput ={'Insert new ingredient here'}
            submitInput={ (inputText) => {this.addItem(inputText, 'ingredients')} }
            closeDialog={ () => this.handleDialogVisible('ingredients')}
          >
          </DialogInput>
        </View>

        <View style={styles.section}>
          <Text style={styles.itemTitle}>
            Tasks
          </Text>
          <FlatList 
            data={tasks} 
            renderItem={({item, index}) => this.renderItems(item, index, 'tasks')}
            keyExtractor={ item => item.title }
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.addItemButton}
              onPress={() => this.handleDialogVisible('tasks')}
            >
              <MaterialIcons name="add" size={24} color={colors.black} />
              <Text>Add task</Text>
            </TouchableOpacity>
          </View>

          <DialogInput 
            isDialogVisible={this.state.isDialogVisible.tasks}
            title={`Add task`}
            hintInput ={'Insert new task here'}
            submitInput={ (inputText) => {this.addItem(inputText, 'tasks')} }
            closeDialog={ () => this.handleDialogVisible('tasks')}
          >
          </DialogInput>
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
    paddingVertical: 6,
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
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addItemButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 4
  },
  deleteButton: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    position: 'absolute',
    right: 10,
    height: 30,
    borderRadius: 4
  }
});