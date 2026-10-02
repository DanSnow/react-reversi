import pkg from '../package.json' with { type: 'json' }

export const appVersion = pkg.version
export const buildTime = new Date().toISOString()
