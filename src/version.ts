import pkg from '../package.json'

export const appVersion = pkg.version
export const buildTime = new Date().toISOString()
