import * as React from "react";

import Option from "./option";

interface Props {
  options: string[];
}

export default class Options extends React.Component<Props, any> {
  render() {
    return (
      <div className="options">
        <h3 className="options-header">Your options:</h3>
        {this.props.options.map((text: string) => (
          <Option option={text} />
        ))}
      </div>
    );
  }
}
