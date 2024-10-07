import mongoose from 'mongoose';

const connectDB = async () => {
    const uri= process.env.MONGODB_URI!;
    await mongoose.connect(uri, {
        // Options spécifiques ne sont plus nécessaires dans les versions récentes
    });
    console.log(`Connected to database:${ uri}`);
};

export default connectDB;
