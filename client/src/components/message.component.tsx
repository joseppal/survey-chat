import * as React from "react";
import { Message, MessageType, Sender } from "../types";

interface Props {
  message: Message;
  onImageLoaded: Function;
}

export default class MessageComponent extends React.Component<Props, any> {

  getMessageClass(): string {
    let className = "message";
    if (this.props.message.sender == Sender.USER) {
      className += " user-message";
    } else {
      className += " bot-message";
    }
    return className;
  }

  renderSpinner() {
    return (
      <div className="message spinner">
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
      </div>
    );
  }

  renderText() {
    return (
      <div className={ this.getMessageClass() }>
        {this.props.message.text}
      </div>
    );
  }

  renderImage() {
    return (
      <div className={ this.getMessageClass() + " image-container"}>
        <img src={this.props.message.url}
          onLoad={() => this.props.onImageLoaded()} />
      </div>
    );
  }

  render() {
    switch (this.props.message.type) {
      case MessageType.SPINNER: {
        return this.renderSpinner();
      }
      case MessageType.TEXT: {
        return this.renderText();
      }
      case MessageType.IMAGE: {
        return this.renderImage();
      }
    }
  }
}
