import express, { Request, Response } from 'express';
const app = express();
app.use(express.json());

// Import Route
import UserRoute from './routes/UserRoute'

// 🏚️ Default Route
// This is the Default Route of the API
app.get('/', async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Express Prisma Boilerplate!' });
});

// Routing User
app.use('/api', UserRoute);

app.listen(4000, () => {
    console.log('Express server is running on port 4000');
});
