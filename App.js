

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Conekta from 'react-native-conekta';
import Api from './api';



type Props = {};
export default class App extends Component<Props> {ç
  create_token = () => {
    //alert("inicio")
    var conektaApi = new Conekta();
  
    conektaApi.setPublicKey( 'key_Pvuz4pSLJ5LyaBBRNUzZdjg' );
  
    conektaApi.createToken({
      cardNumber: '4242424242424242',
      name: 'desde react native',
      cvc: '111',
      expMonth: '11',
      expYear: '21',  
    }, function(data){
      console.log( 'DATA:', data ); // data.id to get the Token ID
      console.warn( 'DATA:', data ); // data.id to get the Token ID
    
      // send data
      Api.add_card({token:data.id})
    }, function(){
      console.log( 'Error!' );
    });
    //alert("aqui")
  }


  render() {
    return (
      <View style={styles.container}>
         <TouchableOpacity
              onPress={this.create_token}
            >
            <Text >TOKEN 0.4</Text>  
        </TouchableOpacity>


        <Text style={styles.welcome}>Welcome to React Native!</Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  
});
