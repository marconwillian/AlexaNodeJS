import express, { Application } from 'express';

import validateSkill from './middleware/validateSkill';
import skillRoutes from './routes';

const app: Application = express();

app.use(express.json());
app.use(validateSkill);
app.use(skillRoutes);

app.use((request, response) => {
  response.status(404).json({ error: "Sorry can't find that!" });
});

export default app;
