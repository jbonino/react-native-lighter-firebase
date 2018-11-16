import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button, Container, Content, Body, Thumbnail, Icon } from "native-base";

import firebase from "react-native-firebase";

import Gallery from "../../../components/ImageGallery/Gallery";
import editProfile from "./editProfile";

export default class ProfileTab extends Component {

  /* init data to prevent null references */
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
    },
    refUserProfile: null,
  };

  componentDidMount() {
    /* get data referance to user profile and store in state */
    const refUser = firebase.database().ref("/users/" + firebase.auth().currentUser.uid);
    this.setState({ refUserProfile: refUser })

    /* update profile with info */
    refUser.on("value",
      //success
      (snapShot) => {
        const userProfile = snapShot.val();
        /* set firebase data to state userprofile */
        if (userProfile) this.setState({ userProfile: userProfile })

        /* if userprofile is null, init data */
        else return refUser.set(
          {
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
          })
      }),
      (err => {
        console.log('Profile: ComponentDidMount: Error=' + err);
      })

  }

  onGalleryPressHandler = key => {
    this.props.navigation.navigate("StoryboardCustom");
  };

  onEditProfilePress = () => {
    /* pass user profile */
    this.props.navigation.navigate("EditProfile", {
      userProfile: this.state.userProfile
    });
  }

  render() {
    return (
      <Container>
        <Content>
          {/* header */}
          <View style={{ padding: 10 }}>
            {this.topRow()}
            {this.profileDescription()}
          </View>
          {/* Gallery */}
          <Gallery
            onPress={key => {
              this.onGalleryPressHandler(key);
            }}
          />
        </Content>
      </Container>
    );
  }

  topRow = () => {
    return (
      <View style={{ flexDirection: "row", paddingBottom: 5 }}>
        {/* profile photo take 1/3rd */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <Image
            style={{ width: 75, height: 75, borderRadius: 37.5 }}
            source={(this.state.userProfile.profilePicture) ? { uri: this.state.userProfile.profilePicture } : require('../../../../assets/fallbacks/profile.png')}
          />
        </View>
        {/* User Stats take 2/3rd */}
        <View style={{ flex: 3 }}>
          {/* Stats */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-end"
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text>{this.state.userProfile.stats.stories}</Text>
              <Text style={{ fontSize: 12, color: "grey" }}>Stories</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>{this.state.userProfile.stats.donatedItems}</Text>
              <Text style={{ fontSize: 12, color: "grey" }}>Donations</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>{this.state.userProfile.stats.miles}</Text>
              <Text style={{ fontSize: 12, color: "grey" }}>Miles</Text>
            </View>
          </View>
          {/**Edit profile and Settings Buttons **/}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              paddingTop: 10
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {/** Edit profile takes up 3/4th **/}
              <Button
                bordered
                dark
                style={{
                  flex: 3,
                  marginLeft: 10,
                  justifyContent: "center",
                  height: 30
                }}
                onPress={() => this.onEditProfilePress()}
              >
                <Text>Edit Profile</Text>
              </Button>

              {/** Settings takes up  1/4th place **/}
              <Button
                bordered
                dark
                style={{
                  flex: 1,
                  height: 30,
                  marginRight: 10,
                  marginLeft: 5,
                  justifyContent: "center"
                }}
              >
                <Icon name="settings" style={{ color: "black" }} />
              </Button>
            </View>
          </View>
          {/**End edit profile**/}
        </View>
      </View>
    );
  };

  profileDescription = () => {
    return (
      <View style={{ paddingBottom: 10 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontWeight: "bold" }}>
            {this.state.userProfile.name}
          </Text>
          <Text>{this.state.userProfile.description}</Text>
        </View>
      </View>
    );
  };




}
