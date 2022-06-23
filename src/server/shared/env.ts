function getEnvValue(valueName: string) {
  const value = process.env[valueName];

  if (value == null) {
    throw new Error(`No value for ${valueName}`);
  }

  return value;
}

export function getHostingEnv(): string {
  const envValue = getEnvValue("HOSTING_ENV");

  return envValue;
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

export function getPasswordSalt() {
  const envValue = getEnvValue("AUTH__PASSWORD_SALT");
  const parsed = Number.parseInt(envValue);

  if (Number.isNaN(parsed)) {
    throw new Error(`Nonnumeric value for AUTH__PASSWORD_SALT: ${envValue}`);
  }

  return parsed;
}
