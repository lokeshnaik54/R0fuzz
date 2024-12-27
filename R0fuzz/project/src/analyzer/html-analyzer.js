import { readFile } from 'fs/promises';
import cheerio from 'cheerio';
import { logger } from '../utils/logger.js';

export async function analyzeHTML(extensionPath) {
  try {
    const htmlFiles = await findHTMLFiles(extensionPath);
    const analyses = await Promise.all(
      htmlFiles.map(file => analyzeSingleHTML(file))
    );
    
    return {
      files: analyses,
      summary: generateHTMLSummary(analyses)
    };
  } catch (error) {
    logger.error('HTML analysis failed:', error);
    throw error;
  }
}

async function analyzeSingleHTML(filePath) {
  const content = await readFile(filePath, 'utf-8');
  const $ = cheerio.load(content);
  
  return {
    path: filePath,
    scripts: analyzeScripts($),
    forms: analyzeForms($),
    externalResources: findExternalResources($)
  };
}

function analyzeScripts($) {
  return $('script').map((_, el) => ({
    src: $(el).attr('src'),
    inline: !$(el).attr('src'),
    content: $(el).html()
  })).get();
}

function analyzeForms($) {
  return $('form').map((_, el) => ({
    action: $(el).attr('action'),
    method: $(el).attr('method'),
    inputs: $(el).find('input').length
  })).get();
}

function findExternalResources($) {
  const resources = [];
  $('[src], [href]').each((_, el) => {
    const url = $(el).attr('src') || $(el).attr('href');
    if (url && url.startsWith('http')) {
      resources.push(url);
    }
  });
  return resources;
}

function generateHTMLSummary(analyses) {
  return {
    totalFiles: analyses.length,
    externalScripts: countExternalScripts(analyses),
    forms: countForms(analyses)
  };
}