import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/app/lib/mongodb";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "OTP",
      credentials: {
        type: { label: "Type", type: "text" },
        value: { label: "Value", type: "text" },
        otp: { label: "OTP", type: "text" }
      },
      async authorize(credentials) {
        const db = await connectToDatabase();
        const { type, value, otp } = credentials;

        const record = await db.collection("otp").findOne({ value, otp });
        if (!record) return null;

        // Clean up OTP
        await db.collection("otp").deleteMany({ value });

        // Find or create user
        let user = await db.collection("users").findOne({ [type]: value });

        if (!user) {
          user = {
            [type]: value,
            createdAt: new Date()
          };
          await db.collection("users").insertOne(user);
        }

        return { id: user._id.toString(), ...user };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
};
