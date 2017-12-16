import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';

import stripchar from 'stripchar';
import commaNumber from 'comma-number';
import { Finance } from 'financejs'
const finance = new Finance();

export default class App extends React.Component {

  state={
    purchasePrice: '',
    downPayment: '',
    interestRate: '',
    closingCosts: '',
    monthlyPayment: 0

  }

  cleanNum = text => {
    return commaNumber(stripchar.StripChar.RSExceptNum(text) || '');
  }

  calculatePayment = () => {
    console.log('calculatePayment called');
    console.log(finance.AM(
      parseFloat(this.state.purchasePrice.replace(',','')), 
      parseFloat(this.state.interestRate), 
      360, 
      1) + '');
    this.setState({monthlyPayment: finance.AM(
      parseFloat(this.state.purchasePrice.replace(',','')), 
      parseFloat(this.state.interestRate), 
      360, 
      1
      ) + ''
    });
  }

  render() {
    console.log(parseFloat(this.state.purchasePrice.replace(',','')));
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Future home ROI</Text>
        <View style={styles.curencyContainer}>
          <Text style={styles.formInput}>$</Text>
          <TextInput 
            keyboardType={'numeric'}
            style={styles.formInput}
            placeholder="Purchase price" 
            value={this.state.purchasePrice}
            onChangeText={text => this.setState({purchasePrice: this.cleanNum(text)})}/>
        </View>
        <View style={styles.curencyContainer}>
          <Text style={styles.formInput}>$</Text>
          <TextInput 
            keyboardType={'numeric'}
            style={styles.formInput}
            placeholder="Down payment"
            value={this.state.downPayment} 
            onChangeText={text => this.setState({downPayment: this.cleanNum(text)})}/>
        </View>
        <View style={styles.curencyContainer}>
          <TextInput 
            keyboardType={'numeric'}
            style={styles.formInput}
            placeholder="Interest rate" 
            value={this.state.interestRate}
            onChangeText={text => this.setState({interestRate: this.cleanNum(text)})}/>
          <Text style={styles.formInput}>%</Text>
        </View>
        <View style={styles.curencyContainer}>
          <Text style={styles.formInput}>$</Text>
          <TextInput 
            keyboardType={'numeric'}
            style={styles.formInput}
            placeholder="Closing costs" 
            value={this.state.closingCosts}
            onChangeText={text => this.setState({closingCosts: this.cleanNum(text)})}/>
        </View>
        <Text style={styles.formInput}>
          30-year fixed
        </Text>
        <TouchableWithoutFeedback
          onPress={this.calculatePayment}> 
          <View style={styles.button}>
           <Text style={{
            color: 'white',
            fontSize: 32
           }}>
             Calculate
           </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 32
          }}>
            Monthly Payment: 
          </Text>
          <Text style={{
            fontSize: 32
          }}>
            {'$' + this.state.monthlyPayment}
          </Text>
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
  },
  button: {
    backgroundColor: '#3B5998',
    minWidth: 300,
    height: 40,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
