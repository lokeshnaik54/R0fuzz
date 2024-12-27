import { Router } from 'express';
import { analyzeExtension } from '../analyzer/index.js';
import { logger } from '../utils/logger.js';

const router = Router();

router.post('/analyze', async (req, res) => {
  try {
    const { extensionPath } = req.body;
    const analysis = await analyzeExtension(extensionPath);
    res.json(analysis);
  } catch (error) {
    logger.error('Analysis failed:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;