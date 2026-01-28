const express = require('express');
const db = require('./db/connect');
const organisationRoutes = require('./features/organisations/organisationsRoute')
const userRoutes = require('./features/users/userRoute')
const officeRoute = require('./features/office/officeRoutes')
const officeBookingRoutes = require('./features/officeBookings/officeBookingsRoute')
const { authenticate } = require('./middleware/authMiddleware')
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

app.use('/office', authenticate, officeRoute)
app.use('/user', userRoutes)
app.use('/organisation', authenticate, organisationRoutes)
app.use('/officeBookings', authenticate, officeBookingRoutes)
app.use(errorHandlerMiddleware);
