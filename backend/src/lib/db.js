import mongoose from "mongoose";

export const dbConn = async () => {
  console.log("inside");
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MOngoDB Connected successfully  `);
    // console.log(`MOngoDB Connected successfully  : ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting db ", error);
    process.exit(1); //1 means failure
  }
};
