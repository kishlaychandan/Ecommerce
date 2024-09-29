import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); 
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
    }
});

// Function to send an email
// process.env.EMAIL,
//       process.env.EMAIL_PASSWORD,
//       email,
//       subject,
//       otp
const from = process.env.EMAIL
const pass = process.env.EMAIL_PASSWORD

export const sendMail = async (from, pass, to, subject, otp) => {
    const mailOptions = {
        from: from,  
        to,                            
        subject,                       
        text: `Your OTP is ${otp}`,                           
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Error sending email: ', error.message);
        return { success: false, message: 'Error sending email' };
    }
};
