import * as React from "react";
import * as _ from "lodash";

import MessageListComponent from "./message-list.component";
import ConversationHandler from  "../conversation-handler";
import { Message, MessageType, Option, Sender } from "../types";
import spinner from "../utils/spinner-message";
import urlSearchParams from "../utils/url-search-params";

interface State {
  messages: Message[];
  options: Option[];
}

export default class MainComponent extends React.Component<any, State> {
  conversationHandler: ConversationHandler;

  constructor(props: any) {
    super(props);
    this.state = {
      messages: [spinner],
      options: []
    };
    this.conversationHandler = new ConversationHandler();
  }

  componentDidMount() {
    const dialogueId = urlSearchParams.get("dialogue") || "unknown-dialogue";
    this.conversationHandler.fetchAndRun(dialogueId, (message: Message, options?: Option[]) => {
      this.handleMessage(message, options);
    });
  }

  handleMessage(message: Message, options?: Option[]) {
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
      options: options || []
    });
  }

  handleOptionSelect(option: Option) {
    this.handleMessage({text: option.text, sender: Sender.USER, type: MessageType.TEXT});
    _.defer(() => {
      this.handleMessage(spinner);
    });
    this.conversationHandler.run(option);
  }

  render() {
    return (
      <div className="content">
        <MessageListComponent
          messages={this.state.messages}
          options={this.state.options}
          onOptionSelect={(option: Option) => this.handleOptionSelect(option)} />
      </div>
    );
  }
}
