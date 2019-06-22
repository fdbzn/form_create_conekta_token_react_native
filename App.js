import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity,TextInput} from 'react-native';
import Conekta from 'react-native-conekta';
import Api from './api';

type Props = {};
export default class App extends Component<Props> {
  state = {
    url:'http://45.55.25.108:1337/test/react_pay',
    cardNumber: '4242424242424242',
    name: 'desde react native',
    cvc: '111',
    expMonth: '11',
    expYear: '21'
  }; 
  
  create_token = () => {
    //alert("inicio")
    var conektaApi = new Conekta();
    let self = this;

    conektaApi.setPublicKey('key_Pvuz4pSLJ5LyaBBRNUzZdjg');

    conektaApi.createToken(
      {
        cardNumber: this.state.cardNumber,
        name: this.state.name,
        cvc: this.state.cvc,
        expMonth: this.state.expMonth,
        expYear: this.state.expYear,
      },
      async function(data) {
        console.log('DATA:', data); // data.id to get the Token ID
        console.warn('DATA:', data); // data.id to get the Token ID

        // send data
        const card = await Api.add_card({token: data.id}, self.state.url);
        console.log("aquiuiuiui");
        console.log(card);
        console.warn(JSON.stringify(card));
      },
      function() {
        console.log('Error!');
      }
    );
    //alert("aqui")
  };

  render() {
    return (
      <View style={styles.container}>
        
        <Text style={styles.label}>url</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          onChangeText={url => this.setState({url})}
        />

        <Text style={styles.label}>numero tarjeta</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          onChangeText={cardNumber => this.setState({cardNumber})}
        />

        <Text style={styles.label}>nombre</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          onChangeText={name => this.setState({name})}
        />
        
        <Text style={styles.label}>cvc</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          onChangeText={cvc => this.setState({cvc})}
        />

        <Text style={styles.label}>exp Month</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          onChangeText={expMonth => this.setState({expMonth})}
        />

        <Text style={styles.label}>exp Year</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          onChangeText={expYear => this.setState({expYear})}
        />



        <TouchableOpacity style={styles.button} onPress={this.create_token}>
          <Text>Enviar datos</Text>
        </TouchableOpacity>
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

  input: {
    paddingTop: 0,
    width: '100%',
    height: 35,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#666',
    color: 'black',
    fontSize: 16,
  },
  label: {
    marginTop: 20,
    paddingHorizontal: 15,
    color: '#b1b1b1',
    fontSize:12,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 48,
    marginBottom: 20,
    borderRadius: 3,

    // ios
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    // android (Android +5.0)
    elevation: 3,
  },
});
