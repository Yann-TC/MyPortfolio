import cors from 'cors';
import express from 'express';
import { config } from './config.js';
import { experienceRouter } from './routes/experienceRoutes.js';
import { portfolioRouter } from './routes/portfolioRoutes.js';
import { profileRouter } from './routes/profileRoutes.js';
import { projectRouter } from './routes/projectRoutes.js';
import { toolboxRouter } from './routes/toolboxRoutes.js';

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: config.corsOrigins,
    }),
  );
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/profile', profileRouter);
  app.use('/projects', projectRouter);
  app.use('/experiences', experienceRouter);
  app.use('/toolbox', toolboxRouter);
  app.use('/portfolio', portfolioRouter);

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
