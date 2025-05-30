import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  use(
    req: {
      headers: Record<string, string | string[] | undefined>;
      lang?: string;
    },
    res: any,
    next: () => void,
  ) {
    req.lang =
      (req.headers['x-lang'] as string) ||
      (req.headers['accept-language'] as string) ||
      'en';
    next();
  }
}
