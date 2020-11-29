import knex, { Config } from 'knex';

import configuration from './knexfile';

export interface PaymentsTable {
  id: number;
  pid: number;
  cid: number;
  plan_id: number;
  boleto_url: string;
  paid_amount: number;
  boleto_expiration_date: Date;
  affiliate_id: number;
  amount_affiliate: number;
  amount: number;
  src?: string;
  method_id: number;
  status_finance_id: number;
}

let config: Config;

if (process.env.NODE_ENV === 'test') {
  config = configuration.test;
} else if (process.env.NODE_ENV === 'production') {
  config = configuration.production;
} else {
  config = configuration.dev;
}

const connection = knex(config);

export default connection;
