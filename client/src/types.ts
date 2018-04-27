enum Sender {
  USER = "USER",
  BOT = "BOT"
}
enum MessageType {
  TEXT = "TEXT",
  SPINNER = "SPINNER"
}
type Message = {
  type: MessageType
  text?: string
  sender: Sender
};
type Option = {
  text: string
  value: string
};

export {
  Message,
  MessageType,
  Option,
  Sender
};
