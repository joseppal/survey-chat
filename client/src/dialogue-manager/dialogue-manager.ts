import * as _ from "lodash";
import { Message, Sender, MessageType, Option } from "../types";
import MessageQueue from "./message-queue";
import Dialogue from "./dialogue";

export default class DialogueManager {
  id: string;
  handleMessage: Function;
  dialogue: Dialogue;
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
        this.dialogue = new Dialogue(data.dialogue);
        this.run();
      });
  }


  run(option?: Option) {
    this.dialogue.stepToNextNode(option);
    const message = this.dialogue.getMessage();
    const options = this.dialogue.getOptions();
    this.messageQueue.addMessageToQueue(message, options);
    if (this.dialogue.hasChildren()) {
      if (!this.dialogue.hasOptions()) {
        this.run();
      }
    }
  }
}
