import * as urlService from "../services/url.service.js";

export async function create(req, res, next) {
  try {
    const url = await urlService.createShortUrl(req.validatedData);
    res.status(201).json({
      success: true,
      data: {
        id: url.id,
        shortCode: url.shortCode,
        shortUrl: `${req.protocol}://${req.get("host")}/${url.shortCode}`,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function redirect(req, res, next) {
  try {
    const originalUrl = await urlService.getOriginalUrl(req.params.shortCode);
    res.redirect(originalUrl);
  } catch (error) {
    next(error);
  }
}

export async function analytics(req, res, next) {
  try {
    const url = await urlService.getAnalytics(req.params.shortCode);

    res.json({
      success: true,
      data: {
        originalUrl: url.originalUrl,
        shortCode: url.customAlias ?? url.shortCode,
        clicks: url.clicks,
        createdAt: url.createdAt,
        updatedAt: url.updatedAt,
        lastVisitedAt: url.lastVisitedAt,
        expiresAt: url.expiresAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function list(req, res, next) {
  try {
    const { page, limit } = req.validatedData;

    const result = await urlService.getAllUrls(page, limit);

    res.json({
      success: true,

      data: result.urls.map((url) => ({
        id: url.id,

        originalUrl: url.originalUrl,

        shortCode: url.customAlias ?? url.shortCode,

        clicks: url.clicks,

        createdAt: url.createdAt,
      })),

      pagination: {
        page,

        limit,

        totalItems: result.totalItems,

        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
}
