enum Sender {
  USER = "USER",
  BOT = "BOT"
}
enum MessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  SPINNER = "SPINNER",
  LINK = "LINK"
}
type Message = {
  type: MessageType
  sender: Sender
  text?: string
  url?: string
  link?: string
  target?: string
  style?: string
};
type Option = {
  text: string
  id: string
};

export {
  Message,
  MessageType,
  Option,
  Sender
};
