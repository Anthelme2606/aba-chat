import User from '../../models/users/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
import * as dotenv from 'dotenv';

dotenv.config(); 

class UserRepository {
    static async create(data: { username: string; password: string }) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10); // Hacher le mot de passe
            const newUser = new User({ username: data.username, password: hashedPassword });
           return await newUser.save();
           // return { message: 'User created successfully' };
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating user: ${error.message}`);
            }
            throw new Error('Unknown error occurred while creating user');
        }
    }

    static async getById(id: string) {
        try {
            const user = await User.findById(id);
            if (user) {
                return user;
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching user by ID: ${error.message}`);
            }
            throw new Error('Unknown error occurred while fetching user by ID');
        }
    }

    static async getAll() {
        try {
            const users = await User.find({});
            return users;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching users: ${error.message}`);
            }
            throw new Error('Unknown error occurred while fetching users');
        }
    }

    static async getByUsername(username: string) {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return null; // Ou `undefined`, selon comment tu gères les utilisateurs non trouvés
            }
            return user;
        } catch (error) {
            throw new Error(`Error fetching user by username: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
        }
    }
    

    static async login(loginData: { username: string; password: string }) {
        try {
            const secretKey:string=process.env.SECRET_KEY || '';
            
            const user = await User.findOne({ username: loginData.username });
            if (user && await bcrypt.compare(loginData.password, user.password)) {
                const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
                return { user, token };
            } else {
                throw new Error('Incorrect username or password');
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Login error: ${error.message}`);
            }
            throw new Error('Unknown error occurred during login');
        }
    }
}

export default UserRepository;
