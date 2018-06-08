import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Footer, FooterTab, Button, Text } from "native-base";

const style = StyleSheet.create({
  footerColor: {
    backgroundColor: "#00ACC1"
  }
});

export default class NavigateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: "active"
    };
  }

  navigateCallback = value => {
    this.setState({ activeButton: value });
    this.props.callbackNavigation(value);
  };

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button
            style={style.footerColor}
            active={this.state.activeButton === "active"}
            onPress={() => this.navigateCallback("active")}
          >
            <Text>To Do</Text>
          </Button>
        </FooterTab>

        <FooterTab>
          <Button
            style={style.footerColor}
            active={this.state.activeButton === "all"}
            onPress={() => this.navigateCallback("all")}
          >
            <Text>Done</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
