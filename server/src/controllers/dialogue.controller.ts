import { Request, Response } from "express";

import Dialogue from "../models/dialogue.model";

/**
 * GET /dialogue/:dialogueId
 */
export let get = (req: Request, res: Response) => {
  let dialogueBranch = Dialogue.find(req.params.dialogueId, req.params.nodeId);
  if (!dialogueBranch) {
    dialogueBranch = [
      { text: "Hi, it seems like you have an invalid url!", type: "TEXT", id: "1" }
    ];
  }
  res.json(dialogueBranch);
};
