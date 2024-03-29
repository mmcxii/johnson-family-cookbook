export enum AuthV1Errors {
  InvalidTokenVersion = "ERROR:INVALID_TOKEN_VERSION",
  TokenNotFound = "ERROR:TOKEN_NOT_FOUND",
  UserNotActive = "ERROR:USER_NOT_ACTIVE",
  PasswordsMustMatch = "ERROR:PASSWORDS_MUST_MATCH",
}

export enum AuthV1Messages {
  LogoutSuccessful = "LOGOUT_SUCCESSFUL",
}
