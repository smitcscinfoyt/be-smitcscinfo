export const I18nKeys = {
  COMMON: {
    HEALTH: 'common.HEALTH',
  },
} as const;

export type TranslationKey = typeof I18nKeys.COMMON.HEALTH;
