import { Request, Response } from "express";
import * as _ from "lodash";

import BEVERAGES_CONVERSATION from "../conversations/tea-or-coffee";

const conversations = [
  BEVERAGES_CONVERSATION
];

function loadConversation(id: string) {
  let conversation = _.find(conversations, (c: any) => {
    return c.id === id;
  });
  if (conversation == undefined) {
    conversation = {
      id: "default",
      conversation: [{ text: "Hi, it seems like you have an invalid url!", type: "TEXT", id: "start" }]
    };
  }
  return conversation;
}

/**
 * GET /conversation/:conversationId
 */
export let get = (req: Request, res: Response) => {
  res.json(loadConversation(req.params.conversationId));
};
