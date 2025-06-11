// src/Users/users.service.ts
import db from '../db';
import { UsersTable, userRoleEnum } from '../schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

interface SafeUser {
  id: number;
  name: string;
  email: string;
  role: typeof userRoleEnum.enumValues[number];
  // createdAt: Date;
}

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  role?: typeof userRoleEnum.enumValues[number];
}

export const getAllUsers = async (): Promise<SafeUser[]> => {
  try {
    return await db.select({
      id: UsersTable.id,
      name: UsersTable.name,
      email: UsersTable.email,
      role: UsersTable.role,
      // createdAt: UsersTable.createdAt
    })
    .from(UsersTable)
    .orderBy(UsersTable.createdAt);
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

export const createUser = async (userData: CreateUserParams): Promise<SafeUser> => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const [newUser] = await db.insert(UsersTable)
      .values({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role || 'user'
        // createdAt is omitted as it has a default value
      })
      .returning({
        id: UsersTable.id,
        name: UsersTable.name,
        email: UsersTable.email,
        role: UsersTable.role,
        // createdAt: UsersTable.createdAt
      });
    
    if (!newUser) {
      throw new Error('Failed to create user');
    }
    
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await db.delete(UsersTable)
      .where(eq(UsersTable.id, userId));
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};

// Add this to the top if not already imported
import { and } from 'drizzle-orm';

interface UpdateUserParams {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  role?: typeof userRoleEnum.enumValues[number];
}

export const updateUser = async (params: UpdateUserParams): Promise<SafeUser> => {
  try {
    const updateData: any = {};
    if (params.name) updateData.name = params.name;
    if (params.email) updateData.email = params.email;
    if (params.role) updateData.role = params.role;
    if (params.password) updateData.password = await bcrypt.hash(params.password, 10);

    const [updatedUser] = await db.update(UsersTable)
      .set(updateData)
      .where(eq(UsersTable.id, params.id))
      .returning({
        id: UsersTable.id,
        name: UsersTable.name,
        email: UsersTable.email,
        role: UsersTable.role,
      });

    if (!updatedUser) throw new Error('User not found');

    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};
