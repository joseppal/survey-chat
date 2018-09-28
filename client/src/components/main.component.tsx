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

  constructor(props: any) {
    super(props);
    this.state = {
      messages: [spinner],
      options: []
    };
    const dialogueId = urlSearchParams.get("dialogue") || "unknown-dialogue";
    this.dialogueManager = new DialogueManager(dialogueId, (message: Message) => {
      this.showMessage(message);
    }, (options: Option[]) => {
      this.showOptions(options);
    });
  }

  scrollToBottom() {
    this.endEl.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.dialogueManager.fetchAndRun();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  showMessage(message: Message) {
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

  showOptions(options: Option[]) {
    this.setState({
      messages: this.state.messages.slice(),
      options: options
    });
  }

  handleOptionSelect(option: Option) {
    this.showMessage({text: option.text, sender: Sender.USER, type: MessageType.TEXT});
    _.defer(() => {
      this.showMessage(spinner);
    });
    this.dialogueManager.selectOption(option);
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
