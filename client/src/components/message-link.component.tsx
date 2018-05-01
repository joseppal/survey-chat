import * as React from "react";
import { Message } from "../types";

interface Props {
  message: Message;
}

export default class MessageLinkComponent extends React.Component<Props, any> {

  render() {
    return (
      <div className={ "message bot-message link"}>
        <a href={this.props.message.link}
          target={this.props.message.target || "_blank"}
          className={this.props.message.style}>
          {this.props.message.text}
        </a>
      </div>
    );
  }
}
