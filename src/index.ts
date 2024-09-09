import express, { Express } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import colors from 'colors';
import cors from 'cors';

// routing imports
import accountRoutes from './routes/account.routes';
import analyticsRoutes from './routes/analytics.routes';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import commentRoutes from './routes/comment.routes';
import courseRoutes from './routes/course.routes';
import documentRoutes from './routes/document.routes';
import faqRoutes from './routes/faq.routes';
import issueRoutes from './routes/issue.routes';
import mediaRoutes from './routes/media.routes';
import messageRoutes from './routes/message.routes';
import notificationRoutes from './routes/notification.routes';
import refreshRoutes from './routes/refresh.routes';
import statusRoutes from './routes/status.routes';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middleware/error/errorHandler';
import { protect } from './middleware/auth/protect';
import { isAdmin } from './middleware/auth/isAdmin';

dotenv.config();

console.log(process.env.NODE_ENV);

// app setup
const app: Express = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

// parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// public routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/refresh', refreshRoutes);

// private routes
app.use(protect);

app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/documents', documentRoutes);
app.use('/api/v1/faqs', faqRoutes);
app.use('/api/v1/issues', issueRoutes);
app.use('/api/v1/media', mediaRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/status', statusRoutes);

app.use('/api/v1/users', userRoutes);

// handling errors
app.use(errorHandler);

// starting server
app.listen(PORT, () =>
  console.log(colors.bgGreen(`SERVER running on port ${PORT}`))
);
