import { Message, Option } from "../types";
import spinner from "./spinner-message";
import * as _ from "lodash";

const WRITING_SPEED = 1000;

export default class MessageQueue {
  queue: Function[];
  handleMessage: Function;

  constructor(handleMessage: Function) {
    this.handleMessage = handleMessage;
    this.queue = [];
  }

  popMessageQueue() {
    const fn = this.queue.shift();
    if (fn) {
      fn();
      if (this.queue.length > 0) {
        _.defer(() => {
          this.handleMessage(spinner);
        });
      }
    }
  }

  addMessageToQueue(message: Message, options: Option[]) {
    if (this.queue.length === 0) {
      _.delay(() => {
        this.popMessageQueue();
      }, WRITING_SPEED);
    }
    this.queue.push(() => {
      this.handleMessage(message, options);
      _.delay(() => {
        this.popMessageQueue();
      }, WRITING_SPEED);
    });
  }
}
