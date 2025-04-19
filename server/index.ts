// server/index.ts
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS setup
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Required for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Email templates
function generateCustomerEmailHtml(name: string, orderDetails: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Thank you for your order, ${name}!</h2>
      <p>Your order #${orderDetails.orderId} has been received.</p>
    </div>
  `;
}

function generateAdminEmailHtml(
  name: string,
  email: string,
  phone: string,
  address: string,
  orderDetails: any,
  paymentScreenshotUrl: string
) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Order Received</h2>
      <p>Order from ${name}, email: ${email}</p>
    </div>
  `;
}

// API: Send order confirmation
app.post('/api/send-order-confirmation', async (req, res) => {
  const { orderDetails, customerEmail, customerName, customerPhone, address, paymentScreenshotUrl } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const customerMailOptions = {
      from: `"Miskaa Store" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: `Order Confirmation - #${orderDetails.orderId}`,
      html: generateCustomerEmailHtml(customerName, orderDetails),
    };

    const adminMailOptions = {
      from: `"Miskaa Store" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Order Received - #${orderDetails.orderId}`,
      html: generateAdminEmailHtml(customerName, customerEmail, customerPhone, address, orderDetails, paymentScreenshotUrl),
      attachments: paymentScreenshotUrl ? [{ filename: 'payment-screenshot.jpg', path: paymentScreenshotUrl }] : [],
    };

    await transporter.sendMail(customerMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(200).json({ success: true, message: 'Emails sent' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Email sending failed' });
  }
});

// API: Upload file
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const filePath = `/uploads/${req.file.filename}`;
  res.json({ success: true, filePath, fileUrl: `http://localhost:${PORT}${filePath}` });
});

// Static file server for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
