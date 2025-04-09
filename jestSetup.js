import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Ensure the environment variables are set for the test
global.process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'http://localhost:54321/fake-url';
global.process.env.SUPABASE_KEY = process.env.SUPABASE_KEY || 'fake-key';
