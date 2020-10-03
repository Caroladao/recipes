import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../Colors';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height
export default class List extends React.Component {

  render() {
    const recipe = this.props.recipe;
    
    return (
      <View style={styles.container}>
        <View style={[styles.listContainer, {backgroundColor: recipe.color}]}>
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
    width: width
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 6,
    marginHorizontal: 0,
    marginVertical: 4,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 340
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 18
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