export interface Form {
  data: string;
  sessionId: string;
  userId: string;
}

export default {
  form: ({ data, sessionId, userId }: Form) => {
    console.log(data, sessionId, userId);
    const resultado = {
      version: '1.0',
      response: {
        outputSpeech: {
          type: 'SSML',
          texta: 'Bem vindo a Plataforma B4You.',
          ssml: `
            <speak>
              <say-as interpret-as="interjection">hey</say-as> Marcon!
              Bem vindo a Plataforma  <lang xml:lang="en-US">B4You</lang>.
            </speak>
          `
        },
        shouldEndSession: false
      }
    };

    return resultado;
  },
  open: ({ data, sessionId, userId }: Form) => {
    console.log(data, sessionId, userId);
    const resultado = {
      version: '1.0',
      response: {
        outputSpeech: {
          type: 'PlainText',
          text: 'UUndefined',
          ssml: null
        },
        shouldEndSession: false
      }
    };

    return resultado;
  }
};
