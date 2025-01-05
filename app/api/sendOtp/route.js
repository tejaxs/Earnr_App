import { db } from "@/firebase/firebaseConfig";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const snsClient = new SNSClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const { phoneNumber } = await req.json();

    // Validate phone number format
    if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
      return new Response(JSON.stringify({ message: "Invalid phone number format" }), { status: 400 });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send OTP via SNS
    const params = {
      PhoneNumber: phoneNumber,
      Message: `Welcome to Earnr! Enter OTP ${otp} to complete your verification. This code is valid for 5 minutes.`,
      MessageAttributes: {
        "AWS.SNS.SMS.SMSType": {
          DataType: "String",
          StringValue: "Transactional",
        },
      },
    };

    await snsClient.send(new PublishCommand(params));

    // Store OTP in Firestore with 5-minute expiry
    const otpRef = doc(db, "otps", phoneNumber);
    await setDoc(otpRef, {
      otp,
      expiry: Timestamp.fromDate(new Date(Date.now() + 5 * 60 * 1000)),
    });

    return new Response(JSON.stringify({ message: "OTP sent successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return new Response(JSON.stringify({ message: "Failed to send OTP" }), { status: 500 });
  }
}
