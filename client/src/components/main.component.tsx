import * as React from "react";

import MessageListComponent from "./message-list.component";
import { Message, MessageType, Option, Sender } from "../types";

interface State {
  messages: Message[];
  options: Option[];
}

export default class MainComponent extends React.Component<any, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      messages: [
        { text: "Hello", sender: Sender.BOT, type: MessageType.TEXT },
        { text: "World!", sender: Sender.BOT, type: MessageType.TEXT },
        { sender: Sender.BOT, type: MessageType.SPINNER },
      ],
      options: [
        { text: "Hello all", value: "Hello1" },
        { text: "Hi there", value: "Hello2" },
      ]
    };
  }

  handleOptionSelect(option: Option) {
    const messages = this.state.messages.slice();
    messages.push({text: option.text, sender: Sender.USER, type: MessageType.TEXT});
    this.setState({
      messages: messages,
      options: this.state.options
    });
  }

  render() {
    return (
      <div className="content">
        <MessageListComponent
          messages={this.state.messages}
          options={this.state.options}
          onOptionSelect={(option: Option) => this.handleOptionSelect(option)} />
      </div>
    );
  }
}
