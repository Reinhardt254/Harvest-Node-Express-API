import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
interface User {
 id: string;
 email: string;
 password: string;
}

export class UserService {
 // In a real app, you'd have a database connection here
 private users: User[] = [];
  async register(email: string, password: string) {
   // Check if user exists
   const existingUser = this.users.find(user => user.email === email);
   if (existingUser) {
     throw new Error('User already exists');
   }
    // Hash password
   const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
   const user = {
     id: Date.now().toString(),
     email,
     password: hashedPassword
   };
   this.users.push(user);
    // Generate token
   const token = this.generateToken(user);
   return { user: { id: user.id, email: user.email }, token };
 }
  async login(email: string, password: string) {
   // Find user
   const user = this.users.find(user => user.email === email);
   if (!user) {
     throw new Error('User not found');
   }
    // Verify password
   const isValid = await bcrypt.compare(password, user.password);
   if (!isValid) {
     throw new Error('Invalid password');
   }
    // Generate token
   const token = this.generateToken(user);
   return { user: { id: user.id, email: user.email }, token };
 }
  private generateToken(user: User) {
   return jwt.sign(
     { id: user.id, email: user.email },
     process.env.JWT_SECRET || 'your-secret-key',
     { expiresIn: '1d' }
   );
 }
}

export const authService = new UserService();
