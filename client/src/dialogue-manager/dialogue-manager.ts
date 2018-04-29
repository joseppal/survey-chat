import * as _ from "lodash";
import { Message, Sender, MessageType, Option } from "../types";
import MessageQueue from "./message-queue";

export default class DialogueManager {
  id: string;
  handleMessage: Function;
  dialogue: any;
  currentNode: any;
  messageQueue: MessageQueue;

  constructor() {}

  fetchAndRun(id: string, handleMessage: Function) {
    this.id = id;
    this.messageQueue = new MessageQueue(handleMessage);
    fetch(`/dialogue/${this.id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.dialogue = data.dialogue;
        this.run();
      });
  }

  getNextNode(option?: Option) {
    if (this.currentNode.children && this.currentNode.children.length > 0) {
      if (this.currentNode.children.length === 1) {
        return this.currentNode.children[0];
      } else {
        const found = _.find(this.currentNode.children, (child: any) => {
          return child.option.id === option.id;
        });
        if (found) {
          return found;
        } else {
          return this.currentNode;
        }
      }
    } else {
      return this.currentNode;
    }
  }

  getOptions() {
    const res = [] as any;
    if (this.currentNode.children && this.currentNode.children.length > 1) {
      this.currentNode.children.forEach((child: any) => {
        res.push(child.option);
      });
    }
    return res;
  }

  getMessage() {
    return {
      text: this.currentNode.text,
      type: this.currentNode.type,
      sender: Sender.BOT
    };
  }

  run(option?: Option) {
    let nextNode;
    if (this.currentNode) {
      nextNode = this.getNextNode(option);
    } else {
      nextNode = this.dialogue[0];
    }
    this.currentNode = nextNode;
    this.messageQueue.addMessageToQueue(this.getMessage(), this.getOptions());

    if (nextNode.children && nextNode.children.length > 0) {
      if (nextNode.children.length === 1) {
        this.run();
      }
    }
  }
}
