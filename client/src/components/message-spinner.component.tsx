import * as React from "react";

export default class MessageSpinnerComponent extends React.Component<any, any> {
  render() {
    return (
      <div className="message spinner">
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
      </div>
    );
  }
}
