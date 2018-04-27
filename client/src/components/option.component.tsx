import * as React from "react";
import { Option } from "../types";

interface Props {
  option: Option;
  onSelect: Function;
}

export default class OptionComponent extends React.Component<Props, any> {
  render() {
    return (
      <div className="option" onClick={() => this.props.onSelect()}>
        {this.props.option.text}
      </div>
    );
  }
}
