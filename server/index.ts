import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import router from "./routes/api"; // Import API routes

const app = express();
dotenv.config();
app.use(cors());
app.use('/api', router); // Mount routes under /api
const PORT = process.env.PORT || 3000;


if (require.main === module) {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

export default app;
