import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'umerazizgujjar009@gmail.com',
      pass: process.env.EMAIL_PASSWORD // App-specific password
    }
  });
};

// Send contact form notification email
export const sendContactNotification = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER || 'umerazizgujjar009@gmail.com',
      to: 'umerazizgujjar009@gmail.com',
      subject: `New Portfolio Contact: ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">📬 New Contact Message</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
              <p style="margin: 5px 0; color: #666; font-size: 14px;">FROM</p>
              <p style="margin: 5px 0; color: #333; font-size: 18px; font-weight: bold;">${contactData.name}</p>
            </div>
            
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
              <p style="margin: 5px 0; color: #666; font-size: 14px;">EMAIL</p>
              <p style="margin: 5px 0; color: #667eea; font-size: 16px;">
                <a href="mailto:${contactData.email}" style="color: #667eea; text-decoration: none;">${contactData.email}</a>
              </p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <p style="margin: 5px 0; color: #666; font-size: 14px;">MESSAGE</p>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #667eea;">
                <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6;">${contactData.message}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0;">
              <p style="margin: 0; color: #999; font-size: 12px;">
                📅 Received: ${new Date().toLocaleString('en-US', { 
                  dateStyle: 'full', 
                  timeStyle: 'short' 
                })}
              </p>
              <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">
                💡 Reply directly to <a href="mailto:${contactData.email}" style="color: #667eea;">${contactData.email}</a> to respond
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              This message was sent from your portfolio contact form
            </p>
          </div>
        </div>
      `,
      // Plain text version for email clients that don't support HTML
      text: `
New Contact Message from Portfolio

From: ${contactData.name}
Email: ${contactData.email}

Message:
${contactData.message}

Received: ${new Date().toLocaleString()}

Reply to: ${contactData.email}
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw error - we still want to save the message in DB even if email fails
    return { success: false, error: error.message };
  }
};

export default { sendContactNotification };
