import PagProDB from '../database';

export interface Form {
  data: string;
  sessionId: string;
  userId: string;
}

export interface CountDB {
  amount: number;
}

export interface PaymentsReport extends CountDB {
  sum: number;
}

export default {
  form: async ({ data, sessionId, userId }: Form) => {
    const payments: PaymentsReport[] = await PagProDB('payments')
      .leftJoin('products', 'payments.pid', 'products.id')
      .where('payments.affiliate_id', 380)
      .where('payments.date_created', '>', '2020-11-01 00:00:00')
      .where('payments.status_finance_id', 3)
      .sum('paid_amount', { as: 'sum' })
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
              <say-as interpret-as="interjection">oi</say-as> Gabriel!
              Seja bem vindo a  <lang xml:lang="en-US">B4You</lang>.
              <break time="1s"/>
              Este mes você já fez ${
                payments[0].amount
              } vendas somando um total de R$ ${payments[0].sum
            .toString()
            .replace('.', ',')}.
            </speak>
          `
        },
        shouldEndSession: false
      }
    };

    // ssml bravo; mano do céu;	muito bem; quem me dera

    // 380

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
