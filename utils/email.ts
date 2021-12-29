import nodemailer from 'nodemailer';
import UserSchema from '../models/user';
import { convert } from 'html-to-text';
import ejs from 'ejs';

class Email {
  from: string;

  constructor(private user: UserSchema, private url: string) {
    this.from = `<${process.env.EMAIL_FROM}>`;
    this.url = url;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: +process.env.EMAIL_PORT,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject: string, template: string) {
    const html = await ejs.renderFile(
      `${process.cwd()}/email/ejs/${template}.ejs`,
      {
        name: this.user.name.split(' ')[0],
        url: this.url,
        type: this.user.type,
      }
    );

    // Send the actual email
    const mailOptions = {
      from: this.from,
      to: this.user.email,
      subject,
      text: convert(html),
      html,
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('Welcome on board', 'welcome');
  }

  async sendDoctor() {
    await this.send('Welcome on board doc', 'doctorEmail');
  }

  async sendPasswordReset() {
    await this.send(
      'Your password reset link (valid for only 10 minutes)',
      'reset'
    );
  }
}

export default Email;
