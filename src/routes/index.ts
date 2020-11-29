import { Request, Response } from 'express';
import controller from '../controller';

interface BodyData {
  request: {
    intent: {
      name: 'report' | 'balance' | 'default';
      slots: string;
    };
    parameters: {
      slots: 'form' | 'open';
    };
  };
  session: {
    sessionId: string;
    user: {
      userId: string;
    };
  };
}

export default async (request: Request, response: Response) => {
  try {
    const body = request.body as BodyData;

    console.log(JSON.stringify(body));

    const alexaRequest = body.request;
    const { session } = body;

    const intent = alexaRequest?.intent?.name || 'default';
    const method = alexaRequest?.parameters?.slots ? 'form' : 'form'; // Rename second for open

    const intentData = alexaRequest?.intent?.slots || 'default';
    const sessionId = session.sessionId || 'default';
    const { userId } = session.user;

    const parament = { data: intentData, sessionId, userId };

    return response
      .status(200)
      .json(await controller[intent][method](parament));
  } catch (err) {
    console.log(err);
    return response.status(400).json({
      version: '1.0',
      response: {
        outputSpeech: {
          type: 'PlainText',
          text: 'UUndefined',
          ssml: null
        },
        shouldEndSession: false
      }
    });
  }
};

// <speak>
//     I want to tell you a secret.
//         <amazon:effect name="whispered">I am not a real human.</amazon:effect>.
//     Can you believe it?
// </speak>
