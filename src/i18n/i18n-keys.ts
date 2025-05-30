export const I18nKeys = {
  COMMON: {
    HEALTH: 'common.HEALTH',
  },
  ROLES: {
    EMPTY_NAME: 'roles.EMPTY_NAME',
  },
} as const;

export type TranslationKey =
  | typeof I18nKeys.COMMON.HEALTH
  | typeof I18nKeys.ROLES.EMPTY_NAME;
