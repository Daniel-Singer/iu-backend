import express, { Express } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import colors from 'colors';

// routing imports
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import commentRoutes from './routes/comment.routes';
import courseRoutes from './routes/course.routes';
import issueRoutes from './routes/issue.routes';
import mediaRoutes from './routes/media.routes';
import messageRoutes from './routes/message.routes';
import statusRoutes from './routes/status.routes';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middleware/error/errorHandler';

dotenv.config();

// app setup
const app: Express = express();

const PORT = process.env.PORT || 8000;

// parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));

// use routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/issues', issueRoutes);
app.use('/api/v1/media', mediaRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/status', statusRoutes);
app.use('/api/v1/users', userRoutes);

// handling errors
app.use(errorHandler);

// starting server
app.listen(PORT, () =>
  console.log(colors.bgGreen(`SERVER running on port ${PORT}`))
);
