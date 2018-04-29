import { Request, Response } from "express";
import * as _ from "lodash";

import BEVERAGES_DIALOGUE from "../dialogues/tea-or-coffee";

const dialogues = [
  BEVERAGES_DIALOGUE
];

function loadDialogue(id: string) {
  let dialogue = _.find(dialogues, (d: any) => {
    return d.id === id;
  });
  if (dialogue == undefined) {
    dialogue = {
      id: "default",
      dialogue: [{ text: "Hi, it seems like you have an invalid url!", type: "TEXT", id: "start" }]
    };
  }
  return dialogue;
}

/**
 * GET /dialogue/:dialogueId
 */
export let get = (req: Request, res: Response) => {
  res.json(loadDialogue(req.params.dialogueId));
};
