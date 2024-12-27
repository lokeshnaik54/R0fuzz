import { parseManifest } from './manifest-analyzer.js';
import { analyzeJavaScript } from './javascript-analyzer.js';
import { analyzeHTML } from './html-analyzer.js';
import { performAIAnalysis } from './ai-analyzer.js';
import { logger } from '../utils/logger.js';

export async function analyzeExtension(extensionPath) {
  try {
    // Analyze manifest.json
    const manifestAnalysis = await parseManifest(extensionPath);
    
    // Analyze JavaScript files
    const jsAnalysis = await analyzeJavaScript(extensionPath);
    
    // Analyze HTML files
    const htmlAnalysis = await analyzeHTML(extensionPath);
    
    // Perform AI-based analysis
    const aiAnalysis = await performAIAnalysis({
      manifest: manifestAnalysis,
      javascript: jsAnalysis,
      html: htmlAnalysis
    });
    
    return {
      manifest: manifestAnalysis,
      javascript: jsAnalysis,
      html: htmlAnalysis,
      aiAnalysis,
      riskScore: calculateRiskScore(aiAnalysis)
    };
  } catch (error) {
    logger.error('Extension analysis failed:', error);
    throw error;
  }
}

function calculateRiskScore(analysis) {
  // Implement risk scoring algorithm based on various factors
  return analysis.riskFactors.reduce((score, factor) => score + factor.weight, 0);
}