import * as React from "react";
import { Message, Sender } from "../types";

interface Props {
  message: Message;
}

export default class MessageTextComponent extends React.Component<Props, any> {
  getMessageClass(): string {
    let className = "message text";
    if (this.props.message.sender == Sender.USER) {
      className += " user-message";
    } else {
      className += " bot-message";
    }
    return className;
  }

  render() {
    return (
      <div className={ this.getMessageClass() }>
        {this.props.message.text}
      </div>
    );
  }
}
