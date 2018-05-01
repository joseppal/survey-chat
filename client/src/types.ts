enum Sender {
  USER = "USER",
  BOT = "BOT"
}
enum MessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  SPINNER = "SPINNER",
  LINK = "LINK",
  YOUTUBE = "YOUTUBE"
}
type Message = {
  type: MessageType
  sender: Sender
  text?: string
  url?: string
  link?: string
  target?: string
  style?: string
  video?: string
  autoplay?: boolean
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
