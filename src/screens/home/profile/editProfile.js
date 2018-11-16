import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { Container, Content, Form, Item, Icon, Input, Label, Button, Toast } from 'native-base';
import firebase from 'react-native-firebase';

export default class EditProfile extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerRight: (
        <Icon name='ios-checkbox' onPress={params.onEditProfileHandler} style={{ fontSize: 75, margin: 0, color: 'blue' }} />
      )
    }
  }
  state = {
    userProfile: {
      name: '',
      username: "",
      description: "",
      profilePicture: "",
      stories: [],
      stats: {
        miles: 0,
        grace: 0,
        donatedItems: 0,
        countries: 0,
        connections: 0,
        stories: 0,
      }
    }
  }

  componentWillMount() {
    const userProfile = this.props.navigation.getParam('userProfile');

    /* set method to header button */
    this.props.navigation.setParams({ onEditProfileHandler: this.onEditProfileHandler });
    
    /* set profile state */
    if (userProfile) {
      this.setState({ userProfile: userProfile })
    }
    else {
      console.log("EditProfile componentWillMount: Userprofile was not passed as prop. Please do!");
    }
  }

  onEditProfileHandler = () => {
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({ ...this.state.userProfile })
      .then(res => {
        Toast.show({
          text: "Successfully updated profile",
          buttonText: "Okay",
          type: "success"
        })
        this.props.navigation.goBack()
      })
      .catch(err=>{
        console.log('EditProifle-onEditProfileHandler: Error');
        console.log(err);
        
        Toast.show({
          text: "Did not update profile. Try again later!",
          buttonText: "Okay",
          duration: 3000,
          type: "danger"
        })
      })
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Icon name='ios-happy-outline' style={{ color: 'grey' }} />
              <Input placeholder='Name' onChangeText={text => this.setState((state) => ({ userProfile: { ...state.userProfile, name: text } }))} value={this.state.userProfile.name} />
            </Item>
            <Item>
              <Icon name='ios-person-outline' style={{ color: 'grey' }} />
              <Input placeholder='Username' onChangeText={text => this.setState((state) => ({ userProfile: { ...state.userProfile, username: text } }))} value={this.state.userProfile.username} />
            </Item>
            <Item>
              <Icon name='ios-quote-outline' style={{ color: 'grey' }} />
              <Input placeholder='Bio' multiline onChangeText={text => this.setState((state) => ({ userProfile: { ...state.userProfile, description: text } }))} value={this.state.userProfile.description} />
              {/*TODO: 280 char limit */}
            </Item>
            <Item style={{ marginTop: 20 }}>
              <Label style={{ color: 'grey' }}>PRIVATE INFORMATION</Label>
            </Item>
            {/*TODO: change email handler */}
            <Item>
              <Icon active name='ios-mail-outline' style={{ color: 'grey' }} />
              <Input placeholder='Email' />
            </Item>
            <Item>
              <Icon active name='ios-phone-portrait-outline' style={{ color: 'grey' }} />
              <Input placeholder='Phone' />
            </Item>
            <Item>
              <Icon active name='ios-lock-outline' style={{ color: 'grey' }} />
              <Input placeholder='Change Password' disabled />
              {/* TODO: change password button and handler. firebase stuff */}
            </Item>
            {/* TODO: link facebook and google acounts here if not already */}
          </Form>
        </Content>
      </Container>
    );
  }
}


