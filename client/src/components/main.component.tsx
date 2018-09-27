import * as React from "react";
import * as _ from "lodash";

import MessageListComponent from "./message-list.component";
import DialogueManager from  "../dialogue-manager/dialogue-manager";
import { Message, MessageType, Option, Sender } from "../types";
import spinner from "../utils/spinner-message";
import urlSearchParams from "../utils/url-search-params";

interface State {
  messages: Message[];
  options: Option[];
}

export default class MainComponent extends React.Component<any, State> {
  dialogueManager: DialogueManager;
  endEl: any;
  dialogueId: string;

  constructor(props: any) {
    super(props);
    this.state = {
      messages: [spinner],
      options: []
    };
    this.dialogueManager = new DialogueManager((message: Message) => {
      this.handleMessage(message);
    }, (options: Option[]) => {
      this.handleOptions(options);
    });
  }

  scrollToBottom() {
    this.endEl.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.dialogueId = urlSearchParams.get("dialogue") || "unknown-dialogue";
    const nodeId = urlSearchParams.get("node") || "0";
    this.dialogueManager.fetchAndRun(this.dialogueId, nodeId);
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleMessage(message: Message) {
    const last = this.state.messages.length - 1;
    let messages;
    if (this.state.messages[last].type === MessageType.SPINNER) {
      messages = this.state.messages.slice(0, last);
    } else {
      messages = this.state.messages.slice();
    }
    messages.push(message);
    this.setState({
      messages: messages,
      options: []
    });
  }

  handleOptions(options: Option[]) {
    this.setState({
      messages: this.state.messages.slice(),
      options: options
    });
  }

  handleOptionSelect(option: Option) {
    this.handleMessage({text: option.text, sender: Sender.USER, type: MessageType.TEXT});
    _.defer(() => {
      this.handleMessage(spinner);
    });
    this.dialogueManager.fetchAndRun(this.dialogueId, option.goto);
  }

  render() {
    return (
      <div className="content">
        <MessageListComponent
          messages={this.state.messages}
          options={this.state.options}
          onOptionSelect={(option: Option) => this.handleOptionSelect(option)}
          onContentLoaded={() => this.scrollToBottom()} />
        <div className="clear" ref={(el) => { this.endEl = el; }}></div>
      </div>
    );
  }
}
