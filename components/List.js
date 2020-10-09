import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,  } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../utils/Colors';

export default class List extends React.Component {
  state = {
    showIngredientsVisible: false,
    showRecipeVisible: false
  }

  render() {
    const recipe = this.props.recipe;
    
    return (
      <View style={styles.container}>
        <View style={[styles.listContainer, {borderLeftColor: recipe.category.color}]}>
          <Text style={[styles.categoryName, {color: recipe.category.color}]} numberOfLines={1}>
            {recipe.category.name}
          </Text>
          <Text style={styles.listTitle} numberOfLines={1}>
            {recipe.name}
          </Text>

          <View>
            <TouchableOpacity style={styles.delete} >
              <MaterialIcons name="delete" size={24} color={colors.red} />
            </TouchableOpacity>
          </View>
          
        </View>
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
    paddingVertical: 16,
    marginHorizontal: 0,
    marginVertical: 4,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderLeftWidth: 6,
    borderBottomRightRadius: 6,
    borderBottomColor: "#f5f5f5",
    width: 340,
  },
  listTitle: {
    marginTop: 5,
    marginBottom: 18,
    fontWeight: "bold",
    fontSize: 20,
    color: colors.black,
    textTransform: "capitalize"
  },
  categoryName : {
    fontSize: 12,
    color: 12,
    position: 'absolute',
    left: 16,
    top: 8
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