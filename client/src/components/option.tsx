import * as React from "react";

interface Props {
  option: string;
}

export default class MessageComponent extends React.Component<Props, any> {
  render() {
    return (
      <div className="option">
        {this.props.option}
      </div>
    );
  }
}
