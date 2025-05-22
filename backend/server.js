const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();
const connectDB = require('./config/db');
const { SERVER_PORT } = require('./config/env');
const userRouter = require('./routes/user.routes');
const commentRouter = require('./routes/comment.routes');
const bookRouter = require('./routes/book.routes');
const categoryRouter = require('./routes/category.routes');
const userBookStatusRouter = require('./routes/userBookStatus.routes');
const userCategoryRouter = require('./routes/userCategory.routes');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));





connectDB();
app.use('/api/categories', categoryRouter);
app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);
app.use('/api/books', bookRouter);
app.use('/api/auth', authRoutes);
app.use('/api/userBookStatus', userBookStatusRouter);
app.use('/api/userCategory', userCategoryRouter);
app.use('/api/user-categories', userCategoryRouter);
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});

