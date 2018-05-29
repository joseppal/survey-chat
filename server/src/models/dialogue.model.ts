// TODO: Replace this with real model
import * as _ from "lodash";

import dialogues from "../dialogues/dialogues";

function find(id: string) {
  return _.find(dialogues, (d: any) => {
    return d.id === id;
  });
}

export default {
  find
};
