import PagProDB from '../database';

export interface Form {
  data: string;
  sessionId: string;
  userId: string;
}

export interface CountDB {
  amount: number;
}

export default {
  form: async ({ data, sessionId, userId }: Form) => {
    const payments: CountDB[] = await PagProDB('payments')
      .leftJoin('products', 'payments.pid', 'products.id')
      .where('products.uid', 4)
      .count('*', { as: 'amount' });

    console.log(payments);

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
              <break time="3s"/>
              Atualmente você já fez ${payments[0].amount} vendas na plataforma.
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
