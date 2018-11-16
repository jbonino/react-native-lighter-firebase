import React from 'react';
import firebase from 'react-native-firebase';

import { AppNavigator } from "./src/config/router";
import {PreAuthNavigator} from './src/config/router'
import { Root, Text } from "native-base";
import Login from './src/screens/login/login'

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Remote Debugger is in a background tab']);


export default class App extends React.Component {
  state={
    loading: true,
    user: null,
  }

  componentDidMount() {
    /*TODO: USER_NOT_FOUND error. when i delete user on firebase, still in local storage */
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      this.setState({
        loading: false,
        user: user
      });
    });
  }
  componentWillUnmount() {
    this.unsubscriber();
  }
  render() {
    /* return app on valid login */
    if(this.state.loading) return <Text>loading</Text>;
    if(!this.state.user) return <Root><PreAuthNavigator><Login/></PreAuthNavigator></Root>
    return (
      <Root>
        <AppNavigator />
      </Root>
    );
  }
}
