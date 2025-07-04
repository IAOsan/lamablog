import { afterAll, afterEach, beforeAll } from 'vitest';
import './mocks/auth.mock';
import { server } from './mockServer';

// Establish API mocking before all tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
