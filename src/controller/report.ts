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
          type: 'PlainText',
          text: 'Marcon, seu saldo na plataforma B4You é de R$ 1459.00!',
          ssml: null
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
