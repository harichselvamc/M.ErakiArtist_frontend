// pages/api/send-order-confirmation.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const {
    orderDetails,
    customerEmail,
    customerName,
    customerPhone,
    address,
    paymentScreenshotUrl
  } = req.body

  try {
    // Create reusable transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Customer email
    const customerMailOptions = {
      from: `"Miskaa Store" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: `Order Confirmation - #${orderDetails.orderId}`,
      html: generateCustomerEmailHtml(customerName, orderDetails),
    }

    // Admin email with more details
    const adminMailOptions = {
      from: `"Miskaa Store" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Order Received - #${orderDetails.orderId}`,
      html: generateAdminEmailHtml(
        customerName, 
        customerEmail, 
        customerPhone, 
        address,
        orderDetails, 
        paymentScreenshotUrl
      ),
      attachments: paymentScreenshotUrl ? [{
        filename: 'payment-screenshot.jpg',
        path: paymentScreenshotUrl
      }] : []
    }

    // Send both emails
    await transporter.sendMail(customerMailOptions)
    await transporter.sendMail(adminMailOptions)

    res.status(200).json({ success: true, message: 'Order confirmation emails sent' })
  } catch (error) {
    console.error('Error sending emails:', error)
    res.status(500).json({ success: false, message: 'Error sending confirmation emails' })
  }
}

function generateCustomerEmailHtml(name: string, orderDetails: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a;">Thank you for your order, ${name}!</h2>
      <p>Your order #${orderDetails.orderId} has been received and is being processed.</p>
      
      <h3 style="color: #1a1a1a; margin-top: 24px;">Order Summary</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Product:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${orderDetails.productName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Size:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${orderDetails.size}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Color:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${orderDetails.color}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Delivery Date:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${orderDetails.deliveryDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Total Amount:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; font-weight: bold;">₹${orderDetails.totalPrice}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Advance Paid:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${orderDetails.advanceAmount}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Balance Due:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${orderDetails.balanceAmount}</td>
        </tr>
      </table>
      
      <p style="margin-top: 24px;">We'll contact you soon with updates on your order.</p>
      <p>Thank you for shopping with us!</p>
    </div>
  `
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
      <h2 style="color: #1a1a1a;">New Order Received</h2>
      
      <h3 style="color: #1a1a1a; margin-top: 24px;">Customer Information</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Name:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Email:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Phone:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Shipping Address:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${address}</td>
        </tr>
      </table>
      
      <h3 style="color: #1a1a1a; margin-top: 24px;">Order Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Order ID:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">#${orderDetails.orderId}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Product:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${orderDetails.productName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Size:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${orderDetails.size}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Color:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${orderDetails.color}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Delivery Date:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${orderDetails.deliveryDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Total Amount:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${orderDetails.totalPrice}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Advance Paid:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${orderDetails.advanceAmount}</td>
        </tr>
      </table>
      
      ${orderDetails.notes ? `
        <h3 style="color: #1a1a1a; margin-top: 24px;">Customer Notes</h3>
        <p>${orderDetails.notes}</p>
      ` : ''}
      
      ${paymentScreenshotUrl ? `
        <h3 style="color: #1a1a1a; margin-top: 24px;">Payment Screenshot</h3>
        <p>Attached to this email.</p>
      ` : ''}
    </div>
  `
}
