import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Header,
  Left,
  Button,
  Right,
  Title,
  Input,
  Item,
  Icon,
  Body,
  Text
} from "native-base";

const style = StyleSheet.create({
  search: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderRadius: 7
  },
  header: {
    backgroundColor: "#00ACC1",
    paddingTop: 45,
    paddingBottom: 20,
    borderBottomColor: "#00ACC1",
    borderBottomWidth: 10
  }
});

export default class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoInput: ""
    };
  }

  handleInputChange = event => {
    this.setState({ todoInput: event.target.value });
  };

  valueCallback = () => {
    if (this.state.todoInput.length > 0) {
      this.props.callbackAddInput(this.state.todoInput);
    }
  };

  render() {
    if (this.props.filter == "active") {
      return (
        <Header searchBar style={style.header}>
          <Item style={{ backgroundColor: "transparent" }}>
            <Input
              style={style.search}
              onChangeText={text => this.setState({ todoInput: text })}
              value={this.state.todoInput}
              placeholder={this.state.placeholder}
            />
          </Item>
          <Right>
            <Button onPress={this.valueCallback} transparent>
              <Icon name="ios-add" />
            </Button>
          </Right>
        </Header>
      );
    } else {
      return (
        <Header style={style.header}>
          <Body>
            <Text>Finished ToDos</Text>
          </Body>
        </Header>
      );
    }
  }
}
