import * as React from "react";
import { Message } from "../types";

interface Props {
  message: Message;
}

export default class MessageVideoYouTubeComponent extends React.Component<Props, any> {
  containerEl: Element;

  componentDidMount() {
    const video = this.props.message.video;
    const autoplay = this.props.message.autoplay;
    const dim = this.containerEl.getBoundingClientRect();
    const width = Math.floor(dim.width);
    const height = Math.round(width / 1.5);
    const html = `<iframe width="${width}" height="${height}"
      src="https://www.youtube.com/embed/${video}${autoplay ? "?&autoplay=1" : ""}"
      frameborder="0"
      allowfullscreen>
      </iframe>`;
    this.containerEl.innerHTML = html;
  }

  render() {
    return (
      <div className={ "message bot-message video youtube"}
        ref={(el) => { this.containerEl = el; }}>
      </div>

    );
  }
}
