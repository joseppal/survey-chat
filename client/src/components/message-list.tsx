import * as React from "react";

import Message from "./message";

interface Props {
  messages: string[];
}

export default class MessageListComponent extends React.Component<Props, any> {
  render() {
    return (
      <div className="message-list">
      {this.props.messages.map((msg: string) => (
        <div className="message-container">
          <Message message={msg} />
        </div>
      ))}
      </div>
    );
  }
}
