import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Container, Content, Grid } from "native-base";
import StoryCustom from "../../components/storyCustom";

export default class StoryBoard extends Component {
  /* passed shallow storyboards.
    look up by ID and load all stories
  */
  state = {
    stories: [
      
      {
        id: "12eqfdfds",
        shallowUser: {
          id: "134234",
          name: "Bethany Diggs",
          profilePhoto: "https://duckduckgo.com/i/79e130ea.jpg"
        },
        photo: "http://88ff.info/photos/88ff/8/106341.jpg",
        location: "gps cordinates from photo",
        date: '5/9/18',
        description: "Thank you Tiffany, it has really tied my room together. I will be sure to pass it on when I graduate two years fro",
        grace: "50",
        isDonated: false
      },
      {
        id: "12eqfdfds",
        shallowUser: {
          id: "134234",
          name: "Tiffany King",
          profilePhoto:
            "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Floudwire.com%2Ffiles%2F2014%2F04%2F170197761.jpg&f=1"
        },
        photo: "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/10435392_10201980777560116_7124073105124507553_n.jpg?_nc_cat=0&oh=5e0b3e276fbd02b7f84b3a4bf0160d25&oe=5BC05F22",
        location: "gps cordinates from photo",
        date: '5/6/18',
        description: "Moving this weekend after graduation and my futon is looking for a good home. Fits perfectly in my dorm roo",
        grace: "50",
        isDonated: true
      },
      {
        id: "12eqfdfds",
        shallowUser: {
          id: "134234",
          name: "Todd Gagnier",
          profilePhoto:
            "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fimages2.fanpop.com%2Fimage%2Fphotos%2F12200000%2FAnthony-Kiedis-anthony-kiedis-12233434-751-909.jpg&f=1"
        },
        photo: "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/10959720_10152518346247271_7534277240750343670_n.jpg?_nc_cat=0&oh=71004d09519dd72688c78dc298470e00&oe=5B8A2B85",
        location: "gps cordinates from photo",
        date: '5/6/18',
        description: "Amazing guitar after some new strings and polish my friend. My girlfriend loves me singing to her and will post a picture la",
        grace: "50",
        isDonated: false
      },
      {
        id: "12eqfdfds",
        shallowUser: {
          id: "134234",
          name: "Kenneth Hicks",
          profilePhoto:
            "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.wennermedia.com%2F920-width%2Frs-134788-john-frusciante.jpg&f=1"
        },
        photo: "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/33891728_10209059594807376_619699802979958784_n.jpg?_nc_cat=0&oh=2395b1a90d9b57dc4278768f0956a705&oe=5B79DE18",
        location: "gps cordinates from photo",
        date: '5/6/18',
        description: "Family guitar that is missing strings. Many memories with this but it needs new ones to",
        grace: "50",
        isDonated: true
      },
      {
        id: "12eqfdfds",
        shallowUser: {
          id: "134234",
          name: "Ana Kirby",
          profilePhoto:
            "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fimages2.fanpop.com%2Fimage%2Fphotos%2F12200000%2FAnthony-Kiedis-anthony-kiedis-12233434-751-909.jpg&f=1"
        },
        photo: "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-0/p320x320/13220879_10153602241611546_3363857778684689403_n.jpg?_nc_cat=0&oh=d1cbce486e0d37880929c93c918e89c1&oe=5B840A91",
        location: "gps cordinates from photo",
        date: '5/2/18',
        description: "Betty! Your dress fit me perfectly but im positive I wont look as beautiful as you did. We can now afford to",
        grace: "50",
        isDonated: false
      },
      {
        id: "12eqfdfds",
        shallowUser: {
          id: "134234",
          name: "Betty Hill",
          profilePhoto:
            "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.wennermedia.com%2F920-width%2Frs-134788-john-frusciante.jpg&f=1"
        },
        photo: "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-0/p417x417/13263694_10153602241521546_5691658837416296026_n.jpg?_nc_cat=0&oh=ae8c3f3c6571adfa11b2de3c88aab3a3&oe=5B8489B3",        
        location: "gps cordinates from photo",
        date: '4/20/18',
        description: "I love this dress but it just sits in my attic. Please breath love back into it for me. Its been so long sin...",
        grace: "50",
        isDonated: true
      }
    ]
  };

  componentDidMount = () => {
    /*TODO: do sideeffects with firebase, load stories */
  };

  onStoryPress = (id) => {
    /*TODO: this.props.navigation.navigate('Story', { id: id }) or pass loaded story from props */
    console.log('ionStoryPress:' + id);

  }

  render() {
    const stories = this.state.stories.map((story, index) => {
      return <StoryCustom onPress={(id) => this.onStoryPress(id)} story={story} key={index} />
    });
    return (
      <Container style={styles.container}>
        <Content>{stories}</Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
