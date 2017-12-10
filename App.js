import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

export default class App extends React.Component {

  state={
    purchasePrice: ''
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Future home ROI</Text>
        <View style={styles.curencyContainer}>
          <Text style={styles.formInput}>$</Text>
          <TextInput 
            style={styles.formInput}
            placeholder="Purchase price" 
            value={this.state.purchasePrice}
            onChangeText={(text) => this.setState({purchasePrice: text})}/>
        </View>
        <View style={styles.curencyContainer}>
          <Text style={styles.formInput}>$</Text>
          <TextInput 
            style={styles.formInput}
            placeholder="Down payment" />
        </View>
        <View style={styles.curencyContainer}>
          <TextInput 
            style={styles.formInput}
            placeholder="Interest rate" />
          <Text style={styles.formInput}>%</Text>
        </View>
        <View style={styles.curencyContainer}>
          <Text style={styles.formInput}>$</Text>
          <TextInput 
            style={styles.formInput}
            placeholder="Closing costs" />
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
    justifyContent: 'center',
  },
  header: {
    fontSize: 40
  },
  curencyContainer:{
    flexDirection: 'row'
  },
  formInput: {
    fontSize: 32,
    textAlign: 'right'
  }
});
