import { Request, Response } from "express";

/**
 * GET /
 * Chat client
 */
export let get = (req: Request, res: Response) => {
  res.render("chat-client", {title: "Hello world!"});
};
