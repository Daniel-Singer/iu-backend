import express, { Express } from 'express';
import colors from 'colors';

const app: Express = express();

const PORT = process.env.PORT || 8000;

// For parsing request body
app.use(express.json());

app.listen(PORT, () =>
  console.log(colors.bgGreen(`SERVER running on port ${PORT}`))
);
