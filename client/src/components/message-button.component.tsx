import * as React from "react";
import { Message } from "../types";

interface Props {
  message: Message;
}

export default class MessageButtonComponent extends React.Component<Props, any> {

  render() {
    return (
      <div className={ "message bot-message button"}>
        <a href={this.props.message.link} target={this.props.message.target || "_blank"}>
          {this.props.message.text}
        </a>
      </div>
    );
  }
}
