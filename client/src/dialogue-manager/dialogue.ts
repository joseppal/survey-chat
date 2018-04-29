import * as _ from "lodash";

import { Message, Sender, MessageType, Option } from "../types";

export default class Dialogue {
  private dialogueTree: any;
  private currentNode: any;

  constructor(dialogueTree: any) {
    this.dialogueTree = dialogueTree;
  }

  hasChildren() {
    return this.currentNode.children && this.currentNode.children.length > 0;
  }

  hasOptions() {
    return this.currentNode.children && this.currentNode.children.length > 1;
  }

  private getNextNode(option?: Option) {
    let node = this.currentNode;
    if (this.hasChildren()) {
      if (this.hasOptions()) {
        const found = _.find(this.currentNode.children, (child: any) => {
          return child.option.id === option.id;
        });
        if (found) {
          node = found;
        }
      } else {
        node = this.currentNode.children[0];
      }
    }
    return node;
  }

  getOptions() {
    const res = [] as any;
    if (this.hasOptions()) {
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

  stepToNextNode(option?: Option) {
    let nextNode;
    if (this.currentNode) {
      nextNode = this.getNextNode(option);
    } else {
      nextNode = this.dialogueTree[0];
    }
    this.currentNode = nextNode;
  }
}
