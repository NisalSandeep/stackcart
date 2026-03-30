import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true })); // `credentials: true` allows frontend to send cookies to the backend
//  so that we can authenticate users using sessions. The `origin` option specifies which frontend URL is allowed to access the backend API.
//  In development, this is usually http://localhost:5173 or http://localhost:3000 depending on your setup.
app.use(clerkMiddleware()); //clerk middleware to handle authentication and user sessions. It will parse the incoming request, check for the presence of a valid session cookie, and populate req.auth with the user's authentication information if the session is valid. This allows us to easily access the authenticated user's information in our route handlers and protect certain routes that require authentication.
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true })); // parses form data

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to STACKCART API",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  });
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

app.listen(ENV.PORT, () => {
  console.log(`Server is up and running on port ${ENV.PORT}`);
});
