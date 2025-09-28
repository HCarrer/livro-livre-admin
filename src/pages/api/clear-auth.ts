import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", `auth_token=; HttpOnly; Max-Age=0; Path=/`);

    return res
      .status(200)
      .json({ message: "Auth cookie removed successfully" });
  }
}
