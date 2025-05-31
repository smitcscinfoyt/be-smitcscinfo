import { Injectable, Scope, Inject } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { REQUEST } from '@nestjs/core';
import { TranslationKey } from '../i18n/i18n-keys';

@Injectable({ scope: Scope.REQUEST })
export class TranslationService {
  constructor(
    private readonly i18n: I18nService,
    @Inject(REQUEST) private readonly req: { lang?: string },
  ) {}

  async t(key: TranslationKey, args?: Record<string, any>): Promise<string> {
    const lang = this.req?.lang || 'en';
    return this.i18n.translate(key, { lang, args });
  }
}
