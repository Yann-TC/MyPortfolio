import { Router } from 'express';
import { getExperiences } from '../portfolioRepository.js';
import { experienceItemSchema } from '../schemas.js';
import { respondWithSchema } from './respondWithSchema.js';

export const experienceRouter = Router();

experienceRouter.get('/', async (_req, res, next) => {
  try {
    respondWithSchema(res, experienceItemSchema.array(), await getExperiences());
  } catch (error) {
    next(error);
  }
});
