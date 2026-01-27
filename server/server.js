const express = require('express');
const db = require('./db/connect');
const authRoutes = require('./routes/authRoute')
const userRoutes = require('./features/users/userRoute')
const officeRoute = require('./features/office/officeRoutes')
const officeBookingRoutes = require('./features/officeBookings/officeBookingsRoute')
const { authenticate, authorisation } = require('./middleware/authMiddleware')
const cors = require('cors')
const errorHandlerMiddleware = require('./middleware/errorHandlers')

const app = express();

db.connectPostgres();

app.listen(3000, () => {
  console.log('Server running');
});

app.use(express.json());

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use('/office', officeRoute)
app.use('/user', userRoutes)
app.use('/officeBookings', officeBookingRoutes)
app.use(errorHandlerMiddleware);
