import * as _ from "lodash";
import { Message, Sender, MessageType, Option } from "../types";
import spinner from "../utils/spinner-message";

const OPTION_SHOW_DELAY = 500;
const DEFAULT_MESSAGE_DELAY = 300;
const NATURAL_REQUEST_DELAY = 300;
const TEXT_MESSAGE_CHAR_WRITE_DELAY = 10;
const TEXT_MESSAGE_CHAR_READ_DELAY = 30;

export default class DialogueManager {
  showMessage: Function;
  showOptions: Function;
  dialogueId: string;
  dialogueBranch: Array<any>;

  constructor(dialogueId: string, showMessage: Function, showOptions: Function) {
    this.showMessage = showMessage;
    this.showOptions = showOptions;
    this.dialogueId = dialogueId;
  }

  fetchAndRun() {
    const fetchStart = Date.now();
    fetch(`/api/dialogue/${this.dialogueId}`)
      .then(res => res.json())
      .then((data) => {
        this.dialogueBranch = data;
        this.run(0, Date.now() - fetchStart);
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
    const fetchStart = Date.now();
    fetch(`/api/dialogue/${this.dialogueId}/option`, options)
      .then(res => res.json())
      .then((data) => {
        this.dialogueBranch = data;
        this.run(0, Date.now() - fetchStart);
      });
  }

  private createMessage(node: any): Message {
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

  private calculateDelay(index: number, fetchDuration: number) {
    let delay;
    const node = this.dialogueBranch[index];
    let minDelay = 0;
    if (index > 0) {
      const prevNode = this.dialogueBranch[index - 1];
      if (prevNode.type == MessageType.TEXT) {
        minDelay = prevNode.text.length * TEXT_MESSAGE_CHAR_READ_DELAY;
      }
    }
    switch (node.type) {
      case MessageType.OPTIONS: {
        delay = OPTION_SHOW_DELAY;
        break;
      }
      case MessageType.TEXT: {
        delay = node.text.length * TEXT_MESSAGE_CHAR_WRITE_DELAY;
        break;
      }
      default: {
        delay = DEFAULT_MESSAGE_DELAY;
      }
    }
    delay += NATURAL_REQUEST_DELAY - fetchDuration;
    return _.max([delay, minDelay]);
  }

  private run(index: number, fetchDuration: number) {
    if (index >= this.dialogueBranch.length) {
      return;
    }
    const node = this.dialogueBranch[index];
    let cb;
    if (node.type == MessageType.OPTIONS) {
      cb = () => {
        this.showOptions(node.options);
      };
    } else {
      cb = () => {
        this.showMessage(this.createMessage(node));
        this.run(index + 1, 0);
      };
    }
    _.delay(() => this.showMessage(spinner), NATURAL_REQUEST_DELAY);
    _.delay(cb, this.calculateDelay(index, fetchDuration));
  }
}
