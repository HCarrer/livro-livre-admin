import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { token } = req.body;
    const expiresIn = 60 * 60 * 1 * 1000; // 1 hour

    if (!token) {
      return res.status(500).json({ message: "No ID token provided" });
    }

    res.setHeader(
      "Set-Cookie",
      `auth_token=${token}; HttpOnly; Max-Age=${expiresIn / 1000}; Path=/`,
    );

    return res.status(200).json({ message: "Session persistence enabled" });
  }
}
