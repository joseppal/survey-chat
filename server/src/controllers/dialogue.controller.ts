import { Request, Response } from "express";

import Dialogue from "../models/dialogue.model";
import notFoundDialogue from "../dialogues/not-found-dialogue";

/**
 * GET /dialogue/:dialogueId
 */
export let get = (req: Request, res: Response) => {
  let dialogue = Dialogue.find(req.params.dialogueId);
  if (!dialogue) {
    dialogue = notFoundDialogue;
  }
  res.json(dialogue);
};
