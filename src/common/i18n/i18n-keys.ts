export const I18nKeys = {
  COMMON: {
    HEALTH: 'common.HEALTH',
  },
  ROLES: {
    EMPTY_NAME: 'roles.EMPTY_NAME',
    DUPLICATE_NAME: 'roles.DUPLICATE_NAME',
    CREATED_SUCCESS: 'roles.CREATED_SUCCESS',
    FETCH_SUCCESS: 'roles.FETCH_SUCCESS',
    INVALID_ID: 'roles.INVALID_ID',
  },
} as const;

export type TranslationKey =
  | typeof I18nKeys.COMMON.HEALTH
  | typeof I18nKeys.ROLES.EMPTY_NAME
  | typeof I18nKeys.ROLES.DUPLICATE_NAME
  | typeof I18nKeys.ROLES.CREATED_SUCCESS
  | typeof I18nKeys.ROLES.FETCH_SUCCESS
  | typeof I18nKeys.ROLES.INVALID_ID;
