function getEnvValue(valueName: string) {
  const value = process.env[valueName];

  if (value == null) {
    throw new Error(`No value for ${valueName}`);
  }

  return value;
}

export function getHostingEnv(): "localhost" | "production" | "stage" {
  const envValue = getEnvValue("HOSTING_ENV");

  if (!["localhost", "stage", "production"].includes(envValue)) {
    throw new Error(`Unexpected value for HOSTING_ENV: ${envValue}`);
  }

  return envValue as "localhost" | "production" | "stage";
}

export function getApiServerPort(): number {
  const envValue = getEnvValue("SERVER_API_PORT");
  const parsed = Number.parseInt(envValue);

  if (Number.isNaN(parsed)) {
    throw new Error(`Nonnumeric value for SERVER_API_PORT: ${envValue}`);
  }

  return parsed;
}

export function getProxyServerPort(): number {
  const envValue = getEnvValue("SERVER_PROXY_PORT");
  const parsed = Number.parseInt(envValue);

  if (Number.isNaN(parsed)) {
    throw new Error(`Nonnumeric value for SERVER_PROXY_PORT: ${envValue}`);
  }

  return parsed;
}

export function getWebpackDevServerPort(): number {
  const envValue = getEnvValue("WEBPACK_DEV_SERVER_PORT");
  const parsed = Number.parseInt(envValue);

  if (Number.isNaN(parsed)) {
    throw new Error(`Nonnumeric value for WEBPACK_DEV_SERVER_PORT: ${envValue}`);
  }

  return parsed;
}

export function getAccessTokenSecret(): string {
  const envValue = getEnvValue("AUTH__ACCESS_TOKEN_SECRET");

  return envValue;
}

export function getRefreshTokenSecret(): string {
  const envValue = getEnvValue("AUTH__REFRESH_TOKEN_SECRET");

  return envValue;
}

export function getRefreshTokenCookieName(): string {
  const envValue = getEnvValue("AUTH__REFRESH_TOKEN_COOKIE_NAME");

  return envValue;
}

export function getPasswordSalt() {
  const envValue = getEnvValue("AUTH__PASSWORD_SALT");
  const parsed = Number.parseInt(envValue);

  if (Number.isNaN(parsed)) {
    throw new Error(`Nonnumeric value for AUTH__PASSWORD_SALT: ${envValue}`);
  }

  return parsed;
}

export function getRedisHost() {
  const envValue = getEnvValue("CACHE__REDIS_HOST");

  return envValue;
}

export function getRedisPort() {
  const envValue = getEnvValue("CACHE__REDIS_PORT");
  const parsed = Number.parseInt(envValue);

  if (Number.isNaN(parsed)) {
    throw new Error(`Nonnumeric value for CACHE__REDIS_PORT: ${envValue}`);
  }

  return envValue;
}

export function getRedisUsername() {
  const envValue = getEnvValue("CACHE__REDIS_USERNAME");

  return envValue;
}

export function getRedisPassword() {
  const envValue = getEnvValue("CACHE__REDIS_PASSWORD");

  return envValue;
}
