import * as React from "react";

import MessageComponent from "./message.component";
import OptionComponent from "./option.component";
import { Message, Option } from "../types";

interface Props {
  messages: Message[];
  options: Option[];
  onOptionSelect: Function;
  onContentLoaded: Function;
}

export default class MessageListComponent extends React.Component<Props, any> {
  render() {
    return (
      <div className="message-list">
      {this.props.messages.map((msg: Message, i: number) => (
        <div className="message-container" key={i}>
          <MessageComponent message={msg} onContentLoaded={() => this.props.onContentLoaded()} />
        </div>
      ))}
        <div className="options-container">
        {this.props.options.map((option: Option, i: number) => (
          <OptionComponent option={option} onSelect={() => this.props.onOptionSelect(option)} key={i} />
        ))}
        </div>
      </div>
    );
  }
}
