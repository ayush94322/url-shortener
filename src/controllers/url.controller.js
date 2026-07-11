import * as urlService from "../services/url.service.js";

export async function create(req, res, next) {
    try {
        const url = await urlService.createShortUrl(req.validatedData);
        res.status(201).json({
            success: true,
            data: {
                id: url.id,
                shortCode: url.shortCode,
                shortUrl: `${req.protocol}://${req.get("host")}/${url.shortCode}`
            }
        });
    } catch(error) {
        next(error);
    }
}