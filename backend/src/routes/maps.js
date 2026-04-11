import { Router } from 'express';

export function createMapsRouter(templates) {
  const router = Router();

  router.get('/', (_req, res) => {
    res.json({
      pages: Object.values(templates).map(template => ({
        page: template.page,
        mode: template.mode,
        areaCount: template.areas.length,
      })),
    });
  });

  router.get('/:page', (req, res) => {
    const page = req.params.page;
    const template = templates[page];
    if (!template) {
      return res.status(404).json({ error: 'Map page not found.' });
    }
    return res.json(template);
  });

  return router;
}
