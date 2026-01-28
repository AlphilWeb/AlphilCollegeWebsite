import { compare, hash } from 'bcryptjs';
import { config } from 'dotenv';
import { eq } from 'drizzle-orm';
import type { JwtPayload, SignOptions } from 'jsonwebtoken';
import { sign, verify } from 'jsonwebtoken';
import db from '../db';
import { SelectUser, UsersTable } from '../schema';

config();

const JWT_SECRET: string = process.env.JWT_SECRET ?? 'dev-secret-32-chars-long-123456';
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ?? '1d') as `${number}${'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'y'}` | number;

interface TokenPayload {
  userId: number;
  role: string;
}

export class AuthService {
  /**
   * Checks if a string is a valid bcrypt hash
   */
  private static isBcryptHash(password: string): boolean {
    return /^\$2[aby]\$\d{2}\$/.test(password);
  }

  /**
   * Generates a JWT token
   */
  private static async generateToken(payload: TokenPayload): Promise<string> {
    return new Promise((resolve, reject) => {
      const options: SignOptions = { expiresIn: JWT_EXPIRES_IN };
      sign(payload, JWT_SECRET, options, (err, token) => {
        if (err || !token) {
          reject(err || new Error('Token generation failed'));
        } else {
          resolve(token);
        }
      });
    });
  }

  /**
   * Register a new user
   */
  static async register(
    email: string,
    password: string,
    name: string
  ): Promise<{
    user: { id: number; email: string; name: string; role: string };
    token: string;
  }> {
    const [existingUser] = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.email, email));

    if (existingUser) {
      throw new Error('User already exists');
    }

    if (this.isBcryptHash(password)) {
      throw new Error('Raw password required - already hashed');
    }

    const hashedPassword = await hash(password, 10);

    const [newUser] = await db
      .insert(UsersTable)
      .values({
        email,
        name,
        password: hashedPassword,
        role: 'user'
      })
      .returning({
        id: UsersTable.id,
        email: UsersTable.email,
        name: UsersTable.name,
        role: UsersTable.role
      });

    const token = await this.generateToken({
      userId: newUser.id,
      role: newUser.role
    });

    return { user: newUser, token };
  }

  /**
   * Login existing user
   */
  static async login(
    email: string,
    password: string
  ): Promise<{
    user: { id: number; email: string; name: string; role: string };
    token: string;
  }> {
    const [user] = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.email, email));

    if (!user || !user.password) {
      throw new Error('Invalid credentials');
    }

    if (!this.isBcryptHash(user.password)) {
      throw new Error('Stored password is not hashed');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = await this.generateToken({
      userId: user.id,
      role: user.role
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    };
  }

  /**
   * Verify JWT token
   */
  static async verifyToken(token: string): Promise<TokenPayload> {
    return new Promise((resolve, reject) => {
      verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(new Error('Invalid token'));
        } else {
          const payload = decoded as JwtPayload & TokenPayload;
          resolve({
            userId: Number(payload.userId),
            role: payload.role
          });
        }
      });
    });
  }

  /**
   * Get current user from token
   */
  static async getCurrentUser(token: string): Promise<SelectUser | null> {
    try {
      const { userId } = await this.verifyToken(token);
      const [user] = await db
        .select()
        .from(UsersTable)
        .where(eq(UsersTable.id, userId));

      return user || null;
    } catch {
      return null;
    }
  }
}