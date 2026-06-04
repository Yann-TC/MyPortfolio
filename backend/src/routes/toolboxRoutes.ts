import { Router } from 'express';
import { getToolbox } from '../portfolioRepository.js';
import { skillGroupSchema } from '../schemas.js';
import { respondWithSchema } from './respondWithSchema.js';

export const toolboxRouter = Router();

toolboxRouter.get('/', async (_req, res, next) => {
  try {
    respondWithSchema(res, skillGroupSchema.array(), await getToolbox());
  } catch (error) {
    next(error);
  }
});
