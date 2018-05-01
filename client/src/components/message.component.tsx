import * as React from "react";
import { Message, MessageType } from "../types";
import Spinner from "./message-spinner.component";
import Text from "./message-text.component";
import Image from "./message-image.component";
import Button from "./message-button.component";

interface Props {
  message: Message;
  onContentLoaded: Function;
}

export default class MessageComponent extends React.Component<Props, any> {

  render() {
    switch (this.props.message.type) {
      case MessageType.SPINNER: {
        return (<Spinner />);
      }
      case MessageType.TEXT: {
        return (<Text message={ this.props.message } />);
      }
      case MessageType.IMAGE: {
        return (<Image message={ this.props.message } onContentLoaded={ this.props.onContentLoaded } />);
      }
      case MessageType.BUTTON: {
        return (<Button message={ this.props.message } />);
      }
    }
  }
}
