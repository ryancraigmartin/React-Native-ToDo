import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container, Root } from "native-base";
import { Font, AppLoading } from "expo";

// Components
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import NavigateTodo from "./components/NavigateTodo";

// Javascript Utilities
import _ from "lodash";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, title: "First ToDo", active: true },
        { id: 2, title: "Done ToDo", active: false }
      ],
      itemFilter: "active",
      loading: true
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  addTodoCallback = childVar => {
    let newId = 1;

    if (this.state.items.length > 0) {
      newId = _.maxBy(this.state.items, "id").id + 1;
    } else {
      newId = 1;
    }

    this.state.items.push({ id: newId, title: childVar, active: true });
    this.setState(this.state);
  };

  navigationCallback = value => {
    this.setState({ itemFilter: value });
  };

  changeStatus = itemId => {
    let items = this.state.items;
    let index = _.findIndex(items, { id: itemId });

    if (items[index].active) {
      items[index].active = false;
    } else {
      items[index].active = true;
    }

    this.setState({ items });
  };

  deleteItem = itemId => {
    let items = this.state.items;
    let index = _.findIndex(items, { id: itemId });

    _.pullAt(items, [index]);

    this.setState({ items });
  };

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    } else {
      return (
        <Container>
          <AddTodo
            placeholder="I, a prop"
            filter={this.state.itemFilter}
            callbackAddInput={this.addTodoCallback}
          />
          {/* Display Todos go here */}
          <TodoList
            items={this.state.items}
            changeStatus={this.changeStatus}
            deleteItem={this.deleteItem}
            filter={this.state.itemFilter}
          />
          {/* Navigate between active and inactive */}
          <NavigateTodo
            filter={this.state.itemFilter}
            callbackNavigation={this.navigationCallback}
          />
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center"
  }
});
