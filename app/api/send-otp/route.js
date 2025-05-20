
import { connectToDatabase } from "@/app/lib/mongodb";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { type, value } = await req.json();
    const db = await connectToDatabase();

    if (!["email", "mobile"].includes(type) || !value) {
      return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
    }

    const users = db.collection("users");
    let user = await users.findOne({ [type]: value });

    // If user doesn't exist, create one
    if (!user) {
      const newUser = {
        [type]: value,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await users.insertOne(newUser);
      user = { _id: result.insertedId, ...newUser };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await db.collection("otp").updateOne(
      { value },
      { $set: { value, otp, createdAt: new Date() } },
      { upsert: true }
    );

    console.log(`[OTP for ${type} ${value}]: ${otp}`);
     if (type === "mobile") {
      await sendSmsOtp(value, otp);
    } else if (type === "email") {
      await sendEmailOtp(value, otp);
    }

    // TODO: Replace with SMS/Email integration

    return new Response(JSON.stringify({ success: true, message: "OTP sent" }), { status: 200 });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
async function sendEmailOtp(email, otp) {
  // Create transporter with your SMTP config
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g. smtp.gmail.com
    port: Number(process.env.SMTP_PORT) || 465, // 465 for SSL, 587 for TLS
    secure: process.env.SMTP_PORT == "465", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // your email
      pass: process.env.SMTP_PASS, // your email password or app password
    },
  });

  const mailOptions = {
    from: `"Your App" <${process.env.SMTP_USER}>`, // sender address
    to: email,
    subject: "Your OTP Code",
    html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
  };

  // Send mail
  await transporter.sendMail(mailOptions);
}

// ✅ SMS via Fast2SMS or any provider
async function sendSmsOtp(mobile, otp) {
  const smsRes = await fetch("https://www.fast2sms.com/dev/bulkV2", {
    method: "POST",
    headers: {
      authorization: "TfwJyZ2EMO8Um6gRpPsKB4DaQdx9kXAcVILohvHY0uFG713tejRSLzAItqfJxkunde8VFWET6rvc1YmB",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      variables_values: otp,
      route: "otp",
      schedule_time :"",
      numbers: mobile,
    }),
  });

  const smsData = await smsRes.json();
  if (!smsData.return) throw new Error("SMS failed");
}