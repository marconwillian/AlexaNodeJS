import { Request, Response, NextFunction } from 'express';

export default (request: Request, response: Response, next: NextFunction) => {
  const xForwardedFor = request.header('x-forwarded-for');
  const { remoteAddress } = request.connection;
  const { session } = request.body;

  let ip = '';
  if (xForwardedFor || request.connection.remoteAddress) {
    ip += xForwardedFor?.split(',')[0] || remoteAddress?.split(':').slice(-1);
  }

  const whitelist = /^(72.21.217.\d{1,3}|54.240.197.\d{1,3}|127.0.0.1)$/;

  if (!whitelist.test(ip)) {
    console.log('Etapa 1');
    console.log(ip);
    return response.status(400).json({
      version: '1.0',
      response: {
        outputSpeech: {
          type: 'PlainText',
          text: 'Forbidden, your App ID is not allowed to make this request!',
          locale: 'pt-BR',
          ssml: null
        },
        shouldEndSession: false
      }
    });
  }

  if (
    !session ||
    !session.application ||
    !session.application.applicationId ||
    session.application.applicationId !== process.env.ALEXA_SKILL_ID
  ) {
    console.log('Etapa 2');
    return response.status(400).json({
      version: '1.0',
      response: {
        outputSpeech: {
          type: 'PlainText',
          text: 'Forbidden, your App ID is not allowed to make this request!',
          locale: 'pt-BR',
          ssml: null
        },
        shouldEndSession: false
      }
    });
  }

  return next();
};
