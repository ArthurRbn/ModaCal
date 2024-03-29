import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {testDB} from './config/database';
import vendorRoutes from './routes/vendor.routes';
import buyerRoutes from './routes/buyer.routes';
import appointmentRoutes from './routes/appointment.routes';

const app = express();
const port = process.env.SERVER_PORT || 3000;

testDB();

app.use(cors());
app.use(express.json());
app.use('/api/vendors', vendorRoutes);
app.use('/api/buyers', buyerRoutes);
app.use('/api/appointments', appointmentRoutes);

app.get('/api', (req, res) => {
  res.send('ModaCal API is up !');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
