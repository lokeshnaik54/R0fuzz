import { readFile } from 'fs/promises';
import { join } from 'path';
import { logger } from '../utils/logger.js';

export async function parseManifest(extensionPath) {
  try {
    const manifestPath = join(extensionPath, 'manifest.json');
    const manifestContent = await readFile(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    return {
      permissions: analyzePermissions(manifest.permissions),
      contentScripts: analyzeContentScripts(manifest.content_scripts),
      backgroundScripts: analyzeBackgroundScripts(manifest.background),
      hostPermissions: analyzeHostPermissions(manifest.host_permissions)
    };
  } catch (error) {
    logger.error('Manifest analysis failed:', error);
    throw error;
  }
}

function analyzePermissions(permissions = []) {
  const highRiskPermissions = ['tabs', 'webRequest', 'storage', 'cookies'];
  return permissions.map(permission => ({
    name: permission,
    riskLevel: highRiskPermissions.includes(permission) ? 'high' : 'low',
    description: getPermissionDescription(permission)
  }));
}

function analyzeContentScripts(contentScripts = []) {
  return contentScripts.map(script => ({
    matches: script.matches,
    js: script.js,
    css: script.css,
    runAt: script.run_at
  }));
}

function analyzeBackgroundScripts(background) {
  return {
    scripts: background?.scripts || [],
    serviceWorker: background?.service_worker,
    type: background?.type
  };
}

function analyzeHostPermissions(hostPermissions = []) {
  return hostPermissions.map(permission => ({
    pattern: permission,
    riskLevel: permission.includes('*') ? 'high' : 'medium'
  }));
}

function getPermissionDescription(permission) {
  const descriptions = {
    tabs: 'Can access browser tabs and their content',
    webRequest: 'Can intercept and modify network requests',
    storage: 'Can store and access data locally',
    cookies: 'Can read and modify browser cookies'
  };
  return descriptions[permission] || 'Standard permission';
}