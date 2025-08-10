import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/url-shortener', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('💡 Make sure MongoDB is running on your system');
    console.log('💡 You can install MongoDB from: https://www.mongodb.com/try/download/community');
    console.log('💡 Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas');
    console.log('💡 For now, the app will use in-memory storage as fallback');
    
    // Fallback to in-memory storage
    console.log('🔄 Using in-memory storage as fallback...');
    return false;
  }
};

export default connectDB; 