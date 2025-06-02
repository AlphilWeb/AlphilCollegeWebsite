"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../schema");
const drizzle_orm_1 = require("drizzle-orm");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-32-chars-long-123456';
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ?? '1d');
class AuthService {
    /**
     * Checks if a string is a valid bcrypt hash
     */
    static isBcryptHash(password) {
        return /^\$2[aby]\$\d{2}\$/.test(password);
    }
    /**
     * Generates a JWT token
     */
    static async generateToken(payload) {
        return new Promise((resolve, reject) => {
            const options = { expiresIn: JWT_EXPIRES_IN };
            (0, jsonwebtoken_1.sign)(payload, JWT_SECRET, options, (err, token) => {
                if (err || !token) {
                    reject(err || new Error('Token generation failed'));
                }
                else {
                    resolve(token);
                }
            });
        });
    }
    /**
     * Register a new user
     */
    static async register(email, password, name) {
        const [existingUser] = await db_1.default
            .select()
            .from(schema_1.UsersTable)
            .where((0, drizzle_orm_1.eq)(schema_1.UsersTable.email, email));
        if (existingUser) {
            throw new Error('User already exists');
        }
        // Prevent accidentally passing hashed passwords
        if (this.isBcryptHash(password)) {
            throw new Error('Raw password required - already hashed');
        }
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 10);
        const [newUser] = await db_1.default
            .insert(schema_1.UsersTable)
            .values({
            email,
            name,
            password: hashedPassword,
            role: 'user'
        })
            .returning({
            id: schema_1.UsersTable.id,
            email: schema_1.UsersTable.email,
            name: schema_1.UsersTable.name,
            role: schema_1.UsersTable.role
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
    static async login(email, password) {
        const [user] = await db_1.default
            .select()
            .from(schema_1.UsersTable)
            .where((0, drizzle_orm_1.eq)(schema_1.UsersTable.email, email));
        if (!user || !user.password) {
            throw new Error('Invalid credentials');
        }
        // Verify stored password is properly hashed
        if (!this.isBcryptHash(user.password)) {
            throw new Error('Stored password is not hashed');
        }
        const isPasswordValid = await (0, bcryptjs_1.compare)(password, user.password);
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
    static async verifyToken(token) {
        return new Promise((resolve, reject) => {
            (0, jsonwebtoken_1.verify)(token, JWT_SECRET, (err, decoded) => {
                if (err) {
                    reject(new Error('Invalid token'));
                }
                else {
                    const payload = decoded;
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
    static async getCurrentUser(token) {
        try {
            const { userId } = await this.verifyToken(token);
            const [user] = await db_1.default
                .select()
                .from(schema_1.UsersTable)
                .where((0, drizzle_orm_1.eq)(schema_1.UsersTable.id, userId));
            return user || null;
        }
        catch {
            return null;
        }
    }
}
exports.AuthService = AuthService;
