// TODO: Replace this with real model
import * as _ from "lodash";

import dialogues from "../dialogues/dialogues";

function find(dialogueId: string, nodeId: string) {
  let ret = _.find(dialogues, (dialogue: any) => {
    return dialogue.id === dialogueId;
  });
  if (ret && ret.dialogue) {
    ret = _.find(ret.dialogue, (branch: any) => {
      return branch[0] && branch[0].id == nodeId;
    });
  }
  return ret;
}

export default {
  find
};
