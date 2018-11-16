import React, { Component } from "react";
import { Image } from "react-native";

export default class ImageElement extends Component {
  render() {
    return (
      <Image
        source={this.props.imgSource}
        style={{
          flex: 1,
          width: null,
          alignSelf: "stretch"
        }}
      />
    );
  }
}
