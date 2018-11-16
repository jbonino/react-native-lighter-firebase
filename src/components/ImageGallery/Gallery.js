import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableNativeFeedback
} from "react-native";

const { width, height } = Dimensions.get("window");
const imagesPerRow = 3;
const gutter = 2;

import ImageElement from "./ImageElement";
import { Button } from "native-base";

export default class Gallery extends Component {
  /* TODO: should be passed an array of images */
  state = {
    images: [
      require("../../../assets/gallery/img1.jpg"),
      require("../../../assets/gallery/img2.jpg"),
      require("../../../assets/gallery/img3.jpg"),
      require("../../../assets/gallery/img9.jpg"),
      require("../../../assets/gallery/img5.jpg"),
      require("../../../assets/gallery/img6.jpg"),
      require("../../../assets/gallery/img7.jpg"),
      require("../../../assets/gallery/img8.jpg"),
      require("../../../assets/gallery/img4.jpg")
    ]
  };

  render() {
    let images = this.state.images.map((img, index) => {
      return (
        <TouchableNativeFeedback key={index} onPress={()=>this.props.onPress(index)}>
          <View
            style={[
              styles.imageWrapper,
              index % imagesPerRow !== 0
                ? { paddingLeft: gutter }
                : { paddingLeft: 0 }
            ]}
          >
            <ImageElement imgSource={img} />
          </View>
        </TouchableNativeFeedback>
      );
    });

    return <View style={styles.galleryContainer}>{images}</View>;
  }
}

const styles = StyleSheet.create({
  galleryContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  imageWrapper: {
    height: width / imagesPerRow,
    width: width / imagesPerRow,
    backgroundColor: "#fff",
    paddingBottom: gutter
  }
});
