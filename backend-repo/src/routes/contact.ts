import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { resend } from '../utils/resend';

const router = Router();
const prisma = new PrismaClient();

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(1),
});

router.post('/', async (req, res) => {
  try {
    const data = contactSchema.parse(req.body);
    
    const submission = await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        service: data.service,
        message: data.message,
      }
    });

    if (process.env.RESEND_API_KEY) {
      try {
        const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
        const adminEmail = process.env.ADMIN_EMAIL;
        const emailPromises = [];

        if (adminEmail) {
          emailPromises.push(
            resend.emails.send({
              from: senderEmail,
              to: adminEmail,
              subject: `New Contact Form Submission - ${data.service}`,
              html: `
                <h2>New Client Inquiry</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>WhatsApp:</strong> ${data.phone}</p>
                <p><strong>Service:</strong> ${data.service}</p>
                <p><strong>Message:</strong></p>
                <p>${data.message}</p>
              `,
            })
          );
        }

        emailPromises.push(
          resend.emails.send({
            from: senderEmail,
            to: data.email,
            subject: 'Thank you for contacting We Raise Tech',
            html: `
              <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #374151; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px;">
                <div style="text-align: center; margin-bottom: 24px;">
                  <h1 style="color: #4F46E5; margin: 0; font-size: 24px;">We Raise Tech</h1>
                </div>
                <h2 style="color: #111827; font-size: 20px; margin-top: 0;">Thank You for Reaching Out!</h2>
                <p style="font-size: 16px; line-height: 1.5;">Hi ${data.name},</p>
                <p style="font-size: 16px; line-height: 1.5;">We've received your inquiry regarding <strong>${data.service}</strong>. Thank you for considering We Raise Tech! Our team is currently reviewing your message.</p>
                <p style="font-size: 16px; line-height: 1.5;">We aim to respond to all inquiries within 24 hours. If you have any additional information to share or if your request is urgent, please feel free to reply directly to this email.</p>
                
                <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; margin: 24px 0;">
                  <p style="margin-top: 0; font-size: 14px; font-weight: 600; color: #4b5563; text-transform: uppercase;">Your Message Summary:</p>
                  <p style="margin-bottom: 0; font-size: 15px; color: #1f2937; white-space: pre-wrap;">${data.message}</p>
                </div>
                
                <p style="font-size: 16px; line-height: 1.5;">Best regards,</p>
                <p style="font-size: 16px; line-height: 1.5; font-weight: 600; color: #111827;">The We Raise Tech Team</p>
                
                <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
                  <p style="font-size: 12px; color: #9ca3af; margin: 0;">This is an automated message. Please do not hesitate to reply if you need immediate assistance.</p>
                </div>
              </div>
            `,
          })
        );

        const results = await Promise.all(emailPromises);
        
        results.forEach((result, index) => {
          if (result.error) {
            console.error(`Resend API Error for email ${index}:`, result.error);
          } else {
            console.log(`Email ${index} sent successfully via Resend`, result.data);
          }
        });
      } catch (mailError) {
        console.error('Failed to send email notifications:', mailError);
      }
    }

    res.status(201).json({ message: 'Message sent successfully!', data: submission });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(400).json({ message: 'Validation failed or server error' });
  }
});

export default router;
