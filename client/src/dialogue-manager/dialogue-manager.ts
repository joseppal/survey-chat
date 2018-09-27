import * as _ from "lodash";
import { Message, Sender, MessageType } from "../types";

export default class DialogueManager {
  handleMessage: Function;
  handleOptions: Function;
  dialogueBranch: Array<any>;

  constructor(handleMessage: Function, handleOptions: Function) {
    this.handleMessage = handleMessage;
    this.handleOptions = handleOptions;
  }

  fetchAndRun(dialogueId: string, nodeId: string) {
    fetch(`/api/dialogue/${dialogueId}/node/${nodeId}`)
      .then((response) => {
        return response.json();
      })
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
