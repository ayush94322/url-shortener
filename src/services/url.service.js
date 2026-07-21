import { nanoid } from "nanoid";
import prisma from "../prisma/client.js";

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

export async function getOriginalUrl(shortCode) {
  const url = await prisma.url.findFirst({
    where: {
      OR: [
        {shortCode},
        {customAlias: shortCode}
      ]
    }
  });

  if(!url) {
    throw new Error("URL_NOT_FOUND");
  }

  if(url.expiresAt && url.expiresAt < new Date()) {
    throw new Error("URL_EXPIRED");
  }

  await prisma.url.update({
    where: {
      id: url.id
    },
    data: {
      clicks: {
        increment: 1
      },
      lastVisitedAt: new Date()
    }
  });

  return url.originalUrl;
}
