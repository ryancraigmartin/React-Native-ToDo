import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Content, List, ListItem, Text, Left,
            Body, Right, Icon, Button, CheckBox } from "native-base";

const style = StyleSheet.create({
  toDoText: {
    paddingLeft: 10
  }
});

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  filterByStatus = item => {
    if (this.props.filter == "active") {
      return item.active;
    } else if (this.props.filter == "all") {
      return !item.active;
    }
  };

  render() {
    return (
      <Content>
        <List>
          {this.props.items.filter(this.filterByStatus).map((item, index) => {
            return (
              <ListItem key={index}>
                <Left>
                  <CheckBox
                    checked={this.props.filter !== "active"}
                    onPress={() => {
                      this.props.changeStatus(item.id);
                    }}
                  />
                  <Body>
                    <Text style={style.toDoText}>{item.title}</Text>
                  </Body>
                </Left>
                <Right>
                  <Button
                    danger
                    onPress={() => {
                      this.props.deleteItem(item.id);
                    }}
                  >
                    <Icon name="ios-trash-outline" />
                  </Button>
                </Right>
              </ListItem>
            );
          })}
        </List>
      </Content>
    );
  }
}
