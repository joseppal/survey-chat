import * as _ from "lodash";
import { Message, Sender, MessageType, Option } from "../types";

export default class DialogueManager {
  handleMessage: Function;
  handleOptions: Function;
  dialogueId: string;
  dialogueBranch: Array<any>;

  constructor(dialogueId: string, handleMessage: Function, handleOptions: Function) {
    this.handleMessage = handleMessage;
    this.handleOptions = handleOptions;
    this.dialogueId = dialogueId;
  }

  fetchAndRun() {
    fetch(`/api/dialogue/${this.dialogueId}`)
      .then(res => res.json())
      .then((data) => {
        this.dialogueBranch = data;
        this.run(0);
      });
  }

  selectOption(option: Option) {
    const options = {
      method: "POST",
      body: JSON.stringify({id: option.id}),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch(`/api/dialogue/${this.dialogueId}/option`, options)
      .then(res => res.json())
      .then((data) => {
        this.dialogueBranch = data;
        this.run(0);
      });
  }

  createMessage(node: any): Message {
    return {
      text: node.text,
      url: node.url,
      link: node.link,
      type: node.type,
      target: node.target,
      style: node.style,
      video: node.video,
      autoplay: node.autoplay,
      sender: Sender.BOT
    };
  }

  run(index: number) {
    if (index >= this.dialogueBranch.length) {
      return;
    }
    const node = this.dialogueBranch[index];
    if (node.type == MessageType.OPTIONS) {
      _.delay(() => {
        this.handleOptions(node.options);
      }, 500);
    } else {
      _.delay(() => {
        this.handleMessage(this.createMessage(node));
        this.run(index + 1);
      }, 1000);
    }
  }
}
