import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Toast
} from "native-base";
import firebase from "react-native-firebase";
import gStyles from "../../config/styles";
import InfoModal from "../../components/UI/Modal/InfoModal";

export default class Login extends Component {
  state = {
    email: "jbonino_5@yahoo.com",
    password: "hockey13",
    registerEmail: "jbonino_5@yahoo.com",
    registerPassword: "hockey13",
    loginError: "",
    registerError: ""
  };

  loginHandler = (email, password) => {
    if (email === "" || password === "") {
      /* this.setState({
        loginError: "Opps, please fill in your email and password."
      }); */
      Toast.show({
        text: "Opps, please fill in your email and password.",
        buttonText: "Okay",
        type: "error"
      })
    } else {
      firebase
        .auth()
        .signInAndRetrieveDataWithEmailAndPassword(email, password)
        .then(user => {
          Toast.show({
            text: "Login Success!",
            buttonText: "Okay",
            type: "success"
          })
        })
        .catch(err => {
          /* this.setState({ loginError: err.message }); */
          Toast.show({
            text: err.message,
            buttonText: "Okay",
            type: "danger",
            duration: 3000
          })
        });
    }
  };

  loginErrorHandler = () => {
    this.setState({ loginError: "" });
  };

  render() {
    return (
      <Container>
        <Content>
          {this.renderLogin()}
          <InfoModal
            summary={this.state.loginError}
            title={"Error with Login"}
            onCancel={() => this.loginErrorHandler()}
            onOk={() => this.loginErrorHandler()}
            isVisible={this.state.loginError !== ""}
          />
        </Content>
      </Container>
    );
  }

  renderLogin = () => {
    return (
      <Container>
        <Form>
          <Text style={gStyles.textTitle}> Login </Text>
          {this.renderSocialButtons()}
          <Text style={gStyles.center}>-------- OR --------</Text>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input
              secureTextEntry
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
            />
          </Item>
          {/* forgot password button */}
          <Button
            transparent
            onPress={() => this.props.navigation.navigate("ForgotPassword")}
          >
            <Text style={{ color: "blue", marginStart: 40 }}>
              Forget Password?
            </Text>
          </Button>
        </Form>
        {/* log in button */}
        <Button
          block
          danger
          rounded
          style={{ margin: 20 }}
          onPress={() =>
            this.loginHandler(this.state.email, this.state.password)
          }
        >
          <Text style={{ color: "white" }}>Log In</Text>
        </Button>
        <Button
          onPress={() => this.props.navigation.navigate("Register")}
          block
          danger
          rounded
          style={{ margin: 20 }}
        >
          <Text>Register with Email</Text>
        </Button>
      </Container>
    );
  };

  renderSocialButtons() {
    return (
      <View>
        <Button
          rounded
          block
          style={{
            backgroundColor: "#3B5998",
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10
          }}
        >
          <Icon name="logo-facebook" />
        </Button>
        <Button
          rounded
          block
          style={{
            backgroundColor: "#34A34F",
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10
          }}
        >
          <Icon name="logo-google" />
        </Button>
      </View>
    );
  }
}
