import dotenv from 'dotenv';

import app from './app';

dotenv.config();

app.listen(3000, () => {
  console.log(`API start on port :3000`);
});
