// TODO: Replace this with real model
import * as _ from "lodash";

import EXAMPLE_DIALOGUE from "../dialogues/example-dialogue";

const dialogues = [
  EXAMPLE_DIALOGUE
];

function find(id: string) {
  return _.find(dialogues, (d: any) => {
    return d.id === id;
  });
}

export default {
  find
};
