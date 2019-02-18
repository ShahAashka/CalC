/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, 
        StyleSheet,
        View,
        Button,
        Text,
        TouchableOpacity
      } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component{
  constructor(){
    super()
    this.state = {
      resultText: "",
      calculationText: ""
    }
    this.operations = [ 'DEL','+', '-', '*', '/']
  }

  validate(){
    const text = this.state.resultText
    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true
  }

  calculateResult(){
    const text = this.state.resultText
    console.log(text, eval(text))
    this.setState({
      calculationText: eval(text)
    })
  }

  buttonPressed(text){
    if(text == '='){
      return this.validate() && this.calculateResult()
    }
    this.setState({
      resultText: this.state.resultText + text
    })
  }

  operate(operation){
    switch(operation){
      case 'DEL':
      console.log(this.state.resultText)
        if(this.state.text == "")return
        let text = this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText: text.join('')
        })
        break

      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.resultText.split('').pop()
        
        if(this.operations.indexOf(lastChar) > 0)return

        if(this.state.text == "")return
        this.setState({
          resultText: this.state.resultText + operation
        })
    }
  }

  render() {

    let rows = []
    let nums = [[7,8,9], 
                [4,5,6], 
                [1,2,3], 
                ['.',0,'=']]
    for(let i=0; i<4; i++){
      let row = []
      for(let j=0; j<3; j++){
        row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.touchStyle}>
          <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>)
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

    let ops = []
    for(let i=0; i<5; i++){
      ops.push(<TouchableOpacity key={this.operations[i]} onPress={() => this.operate(this.operations[i])} style={styles.touchStyle}>
        <Text style={styles.btnText}>{this.operations[i]}</Text>
        </TouchableOpacity>)
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  result: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'flex-end'
  },
  calculation: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-end'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row'
  },
  numbers: {
    flex: 3,
    backgroundColor: '#434343'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#636363'
  },
  resultText: {
    fontSize: 45,
    color: 'black'
  },
  calculationText: {
    fontSize: 30,
    color: 'black'
  },
  touchStyle: {
    flex:1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 35,
    color: 'white'
  }
});
