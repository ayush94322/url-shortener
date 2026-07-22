import { nanoid } from "nanoid";
import prisma from "../prisma/client.js";
import NotFoundError from "../errors/NotFoundError.js";
import ExpiredUrlError from "../errors/ExpiredUrlError.js";


export async function createShortUrl(data) {
  const shortCode = data.customAlias ?? nanoid(6);

  const url = await prisma.url.create({
    data: {
      originalUrl: data.url,
      shortCode,
      customAlias: data.customAlias,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
    },
  });
  return url;
}

function findUrl(shortCode) {
  return prisma.url.findFirst({
    where: {
      OR: [{ shortCode }, { customAlias: shortCode }],
    },
  });
}

export async function getOriginalUrl(shortCode) {
  const url = await findUrl(shortCode);

  if (!url) {
    throw new NotFoundError("Short URL not found");
  }

  if (url.expiresAt && url.expiresAt < new Date()) {
    throw new ExpiredUrlError("URL_EXPIRED");
  }

  await prisma.url.update({
    where: {
      id: url.id,
    },
    data: {
      clicks: {
        increment: 1,
      },
      lastVisitedAt: new Date(),
    },
  });

  return url.originalUrl;
}

export async function getAnalytics(shortCode) {
  const url = await findUrl(shortCode);

  if (!url) {
    throw new NotFoundError("Short URL not found");
  }

  return url;
}

export async function getAllUrls(page, limit) {
  const skip = (page-1)*limit;

  const [urls, totalItems] = await prisma.$transaction([
    prisma.url.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc"
      }
    }),
    prisma.url.count()
  ]);

  return {
    urls,
    totalItems,
    totalPages: Math.ceil(totalItems / limit)
  };
}