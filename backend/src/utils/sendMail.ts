import Mailgen from "mailgen";
import nodemailer from "nodemailer";

interface Ioptions {
    email: string,
    subject: string,
    mailgenContent: any
}

export const sendMail = async (options: Ioptions) => {
    let config = {
        service: "gmail",
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD,
        }
    }

    let transporter = nodemailer.createTransport(config);
    let mailGenerator = new Mailgen(
        {
            theme: "default",
            product: {
                name: "Learn Plus",
                link: "http://localhost:3000/"
            }
        }
    )
    const emailHtml = mailGenerator.generate(options.mailgenContent);

    const mail = {
        from: "LearnPlus@gmail.com",
        to: options.email,
        subject: options.subject,
        html: emailHtml,
    }

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

export const emailVerificationContent = (name: string, OTPNumber: number) => {
    return {
        body: {
            name: name,
            intro: "Welcome to LearnPlus. We’re thrilled to have you join our community of learners",
            action: {
                instructions:
                    "Use this OTP to get started with Us",
                button: {
                    color: '#48cfad',
                    text: `${OTPNumber}`,

                }
            },
        },
    };
};







