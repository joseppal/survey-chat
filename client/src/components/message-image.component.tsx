import * as React from "react";
import { Message } from "../types";

interface Props {
  message: Message;
  onContentLoaded: Function;
}

export default class MessageImageComponent extends React.Component<Props, any> {

  render() {
    const image = (
      <img src={this.props.message.url}
          onLoad={() => this.props.onContentLoaded()} />
    );
    const content = this.props.message.link ? (
      <a href={this.props.message.link} target="_blank">{image}</a>
    ) : image;
    return (
      <div className={ "message bot-message image-container"}>
        {content}
      </div>
    );
  }
}
