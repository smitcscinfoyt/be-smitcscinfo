export enum LanguageEnum {
  EN = 'en',
  GU = 'gu',
  HI = 'hi',
}
export const SupportedLanguages = Object.values(LanguageEnum);
export const LanguageMap: Record<LanguageEnum, string> = {
  [LanguageEnum.EN]: 'English',
  [LanguageEnum.GU]: 'Gujarati',
  [LanguageEnum.HI]: 'Hindi',
};
export const LanguageCodeMap: Record<LanguageEnum, string> = {
  [LanguageEnum.EN]: 'en-US',
  [LanguageEnum.GU]: 'gu-IN',
  [LanguageEnum.HI]: 'hi-IN',
};
