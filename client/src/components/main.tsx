import * as React from "react";

import MessageList from "./message-list";
import Options from "./options";

export default class MainComponent extends React.Component {

  messages: string[];
  options: string[];

  constructor(props: any) {
    super(props);
    this.messages = [
      "Hello",
      "World!",
      "Hello",
      "World!",
      "Hello",
      "World!",
      "Hello",
      "World!",
      "Hello",
      "World!",
      "Hello",
      "World!",
      "Hello",
      "World!",
      "Hello",
      "World!",
      "Hello",
      "World!",
      "Hello",
      "World!",
      "Hello",
      "World!",
      "Hello",
      "World!",
    ];
    this.options = [
      "Hello",
      "hi"
    ];
  }

  render() {
    return (
      <div className="content">
        <MessageList messages={this.messages} />
        <Options options={this.options} />
      </div>
    );
  }
}
