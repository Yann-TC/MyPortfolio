import cors from 'cors';
import express from 'express';
import { config } from './config.js';
import { getPortfolioData } from './portfolioRepository.js';

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: config.corsOrigin,
    }),
  );
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/portfolio', async (_req, res, next) => {
    try {
      res.json(await getPortfolioData());
    } catch (error) {
      next(error);
    }
  });

  app.use(
    (
      error: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      const message = error instanceof Error ? error.message : 'Unexpected API error.';

      res.status(500).json({
        error: message,
      });
    },
  );

  return app;
}
