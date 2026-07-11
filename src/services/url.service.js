import { nanoid } from "nanoid";
import { prisma } from "../prisma/client.js";

export async function createShortUrl(data) {
  const shortCode = data.customAlias ?? nanoid(6);

  const url = await prisma.url.create({
    data: {
      originalUrl: data.url,
      shortCode,
      customAlias: data.customAlias,
      expiresAt: data.expiresAt ? new Date(date.expiresAt) : null,
    },
  });
  return url;
}
