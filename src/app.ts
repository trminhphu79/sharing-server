import express from 'express'
import cors from 'cors'
import { initMongooes } from './settings'
import mainRoutes from './api/routes';
import authRoutes from './auth/routes';
import { graphqlMiddleware } from './graphql/graphql.middleware';


//init db
initMongooes();

const app = express();

app.use(cors());
app.use(express.json());

app.use('', mainRoutes);
app.use('/auth', authRoutes);
app.use('/graphql', graphqlMiddleware())

app.use('/', (req: any, res: any) => {
  res.status(404).json({ message: 'Not found' });
})

export default app