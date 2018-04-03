import * as React from "react";

interface Props {
  message: string;
}

export default class MessageComponent extends React.Component<Props, any> {
  render() {
    return (
      <div className="message">
        {this.props.message}
      </div>
    );
  }
}
