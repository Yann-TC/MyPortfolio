import { Router } from 'express';
import { getPortfolioData } from '../portfolioRepository.js';
import { portfolioDataSchema } from '../schemas.js';
import { respondWithSchema } from './respondWithSchema.js';

export const portfolioRouter = Router();

portfolioRouter.get('/', async (_req, res, next) => {
  try {
    respondWithSchema(res, portfolioDataSchema, await getPortfolioData());
  } catch (error) {
    next(error);
  }
});
