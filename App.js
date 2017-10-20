import React from "react";
import { FlatList, Button } from "react-native";
import ListRow from "./ListRow";
import data from "./data";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: data.splice(0, 30)
    };
  }

  render() {
    return (
      <FlatList
        ref="list"
        style={{ marginTop: 20 }}
        data={this.state.people}
        renderItem={({ item, index }) => (
          <ListRow
            {...item}
            index={index}
            isLastItem={index === this.state.people.length - 1}
            onRemove={() => this.handleRemove(index)}
          />
        )}
        keyExtractor={item => item.login.username}
      />
    );
  }
}
