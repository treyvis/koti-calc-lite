import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';

import stripchar from 'stripchar';
import commaNumber from 'comma-number';
import { Finance } from 'financejs'
const finance = new Finance();

export default class App extends React.Component {

  state={
    purchasePrice: '250,000',
    downPayment: '50,000',
    interestRate: '3.8',
    closingCosts: '7,500',
    monthlyPayment: '0',
    mortgageInsurance: '0'

  }

  cleanNum = text => {
    return commaNumber(stripchar.StripChar.RSExceptNum(text) || '');
  }

  cleanFloat = text => {
    if (/^\d+\.?\d*?$/.test(text)) {
      this.setState({interestRate: text});
      console.log(true);
      return text;
    } else {
      return this.state.interestRate;
    }
  }

  calculatePayment = () => {
    let update = {monthlyPayment: commaNumber(finance.AM(
      parseFloat(this.state.purchasePrice.replace(',','')) - 
      parseFloat(this.state.downPayment.replace(',','')) +
      parseFloat(this.state.closingCosts.replace(',','')),
      parseFloat(this.state.interestRate), 
      360, 
      1
      ).toFixed()) + ''
    };

    console.log(parseFloat(this.state.downPayment.replace(',','')));
    console.log(parseFloat(this.state.purchasePrice.replace(',','')));
    console.log(parseFloat(this.state.downPayment.replace(',','')) /
      parseFloat(this.state.purchasePrice.replace(',','')) );

    if (parseFloat(this.state.downPayment.replace(',','')) /
      parseFloat(this.state.purchasePrice.replace(',','')) 
      < .2) {
      console.log('PMI');
      update = {...update, mortgageInsurance: commaNumber(((parseFloat(this.state.purchasePrice.replace(',','')) - parseFloat(this.state.downPayment.replace(',',''))) / 1200).toFixed()) + ''};
    }

    this.setState(update);
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Home Monthly Payment</Text>
        <Text style={styles.formInput}>Purchase Price:</Text>
        <View style={styles.curencyContainer}>
          <Text style={styles.formInput}>$</Text>
          <TextInput 
            keyboardType={'numeric'}
            style={styles.formInput}
            placeholder={this.state.purchasePrice}
            value={this.state.purchasePrice}
            onBlur={() => {
              if(parseFloat(this.state.purchasePrice.replace(',','')) === 'NaN'){
                console.log("NaN")
              } else {
                console.log('Purchase is a number')
              }
            }}
            onChangeText={text => this.setState({purchasePrice: this.cleanNum(text)})}/>
        </View>
        <Text style={styles.formInput}>Down Payment:</Text>
        <View style={styles.curencyContainer}>
          <Text style={styles.formInput}>$</Text>
          <TextInput 
            keyboardType={'numeric'}
            style={styles.formInput}
            placeholder="Down payment"
            value={this.state.downPayment} 
            onChangeText={text => this.setState({downPayment: this.cleanNum(text)})}/>
        </View>
        <Text style={styles.formInput}>Interest Rate:</Text>
        <View style={styles.curencyContainer}>
          <TextInput 
            keyboardType={'numeric'}
            style={styles.formInput}
            placeholder="Interest rate" 
            value={this.state.interestRate}
            onChangeText={text => this.setState({interestRate: this.cleanFloat(text)})}/>
          <Text style={styles.formInput}>%</Text>
        </View>
        <Text style={styles.formInput}>Closing Costs:</Text>
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
          <Text style={styles.formInput}>
            Mortgage Payment: 
          </Text>
          <Text style={styles.formInput}>
            {'$' + this.state.monthlyPayment}
          </Text>
        </View>
        <View style={{
          alignItems: 'center',
        }}>
          <Text style={styles.formInput}>
            Mortgage Insurance: 
          </Text>
          <Text style={styles.formInput}>
            {'$' + this.state.mortgageInsurance}
          </Text>
        </View>
      </View>
      </ScrollView>
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
