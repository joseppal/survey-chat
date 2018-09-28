import { Request, Response } from "express";

import Dialogue from "../models/dialogue.model";

/**
 * GET /api/dialogue/:dialogueId
 */
export const getFirstDialogueBranch = (req: Request, res: Response) => {
  const dialogue = Dialogue.find(req.params.dialogueId);
  let dialogueBranch;
  if (dialogue) {
    dialogueBranch = dialogue.dialogue[0];
  } else {
    dialogueBranch = [
      { text: "Hi, it seems like you have an invalid url!", type: "TEXT" }
    ];
  }
  res.json(dialogueBranch);
};

function findOption(dialogue: any, optionId: string) {
  let option;
  for (let i = 0; i < dialogue.length; i++) {
    const branch = dialogue[i];
    const lastNode = branch[branch.length - 1];
    if (lastNode.type == "OPTIONS") {
      option = lastNode.options.find((o: any) => o.id == optionId);
    }
    if (option) {
      break;
    }
  }
  return option;
}

function findBranch(dialogue: any, firstNodeId: string) {
  return dialogue.find((d: Array<any>) => d[0].id == firstNodeId);
}

function badRequest(res: Response) {
  res.json([
    { text: "Bad request", type: "TEXT" }
  ]);
}

/**
 * POST /api/dialogue/:dialogueId/option
 */
export const postOption = (req: Request, res: Response) => {
  if (!req.params.dialogueId || !req.body.id) {
    return badRequest(res);
  }
  const dialogue = Dialogue.find(req.params.dialogueId);
  if (!dialogue) {
    return badRequest(res);
  }
  const option = findOption(dialogue.dialogue, req.body.id);
  const branch = findBranch(dialogue.dialogue, option.goto);
  if (!branch) {
    return badRequest(res);
  }
  res.json(branch);
};
