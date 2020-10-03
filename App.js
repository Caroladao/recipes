import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from './Colors';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row"}}>
        <View style={styles.divider} />
        <Text style={styles.title}>My<Text style={styles.title2}>Recipes</Text></Text>
        <View style={styles.divider} />
      </View>

      
      <TouchableOpacity style={styles.addItem}>
        <MaterialIcons name="add-circle" size={60} color={colors.blue} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    right: 15
  }
});
