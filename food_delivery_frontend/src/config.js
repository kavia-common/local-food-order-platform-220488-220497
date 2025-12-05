const readEnv = (key, fallback = undefined) => {
  // Vite injects import.meta.env.* at build time
  try {
    const v = import.meta && import.meta.env ? import.meta.env[key] : undefined
    return (v === undefined || v === null || v === '') ? fallback : v
  } catch {
    return fallback
  }
}

const apiBase =
  readEnv('VITE_API_BASE') ||
  readEnv('VITE_BACKEND_URL') ||
  '' // empty => use mock in api layer

// PUBLIC_INTERFACE
export const config = {
  /** API base URL preferred from VITE_API_BASE, else VITE_BACKEND_URL; empty indicates mock mode */
  apiBase,
  frontendUrl: readEnv('VITE_FRONTEND_URL'),
  wsUrl: readEnv('VITE_WS_URL'),
  nodeEnv: readEnv('VITE_NODE_ENV', 'development'),
  enableSourceMaps: readEnv('VITE_ENABLE_SOURCE_MAPS', 'false') === 'true',
  port: Number(readEnv('VITE_PORT', '3000')),
  trustProxy: readEnv('VITE_TRUST_PROXY', 'false') === 'true',
  logLevel: readEnv('VITE_LOG_LEVEL', 'info'),
  healthcheckPath: readEnv('VITE_HEALTHCHECK_PATH', '/health'),
  featureFlags: readEnv('VITE_FEATURE_FLAGS', '{}'),
  experimentsEnabled: readEnv('VITE_EXPERIMENTS_ENABLED', 'false') === 'true',
}
