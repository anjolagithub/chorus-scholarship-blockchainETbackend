import dotenv from "dotenv";
dotenv.config();

export const config = {
  environment: {
    env: process.env.NODE_ENV,
    branchName: process.env.BRANCH_NAME,
  },
  port: process.env.PORT,
  storage: {
    database: {
      mongoURI: process.env.MONGO_URI || "",
    },
    fileStorage: {
      googleCloud : {
        projectId: process.env.PROJECT_ID,
        keyFilename: process.env.KEYFILENAME
      },
      cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
      },
    }
  },

  brevo: {
    apiKey: process.env.BREVO_API_KEY,
  },

  clients: {
    stagging: {
      landingPage: "",
      shoppingApp: "",
    },
    production: {
      landingPage: "",
      shoppingApp: "",
    },
  },
  oauth: {
    google: {
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      redirectUrl: {
        // staggingLink: 'https://stagging.farmily.africa/auth/google/callback',
        staggingLink: "http://localhost:8000/auth/google/callback",
        productionLink: "/auth/google/callback",
      },
    },
  },
  tokenSecrets: {
    accessToken: {
      secret: process.env.ACCESS_TOKEN_SECRET || "hgjfj",
      expiresIn: "12h",
    },
    resetToken: { secret: process.env.RESET_TOKEN_SECRET, expiresIn: "6h" },
    verificationToken: {
      secret: process.env.VERIFICATION_TOKEN_SECRET,
      expiresIn: "6h",
    },
    newsletterSubscription: {
      secret: process.env.NEWSLETTER_SUBSCRIPTION_SECRET,
      expiresIn: "24h",
    },
  },
};
