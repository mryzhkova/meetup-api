import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import swaggerUI from 'swagger-ui-express';

import meetupRouter from './routes/meetup.routes.js';
import { specs } from './swagger/swagger.js';

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', meetupRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
