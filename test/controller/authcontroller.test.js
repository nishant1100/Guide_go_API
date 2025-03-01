const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../../model/user'); // Corrected import path
const { login, register } = require('../../controller/AuthController'); // Corrected import path

// Mocking dependencies
jest.mock('../../model/user'); // Corrected path for user model
jest.mock('bcryptjs'); // Mock bcrypt
jest.mock('jsonwebtoken'); // Mock jwt

describe('Auth Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Register', () => {
        it('should register a user successfully', async () => {
            const req = {
                body: { username: 'testuser', password: 'password123', role: 'user' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashedPassword');

            user.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue({})
            }));

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            //expect(res.json).toHaveBeenCalledWith({ message: "User registered successfully" });
        });

        it('should return 400 if password is missing', async () => {
            const req = { body: { username: 'testuser' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Password is required" });
        });
    });

    describe('Login', () => {
        it('should log in a user successfully', async () => {
            const req = {
                body: { username: 'testuser', password: 'password123' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            user.findOne.mockResolvedValue({
                username: 'testuser',
                password: 'hashedPassword',
                role: 'user'
            });

            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('mockedToken');

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ token: 'mockedToken', message: "Login successful" });
        });

        it('should return 403 if user does not exist', async () => {
            const req = { body: { username: 'unknown', password: 'password123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            user.findOne.mockResolvedValue(null);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid username or password' });
        });

        it('should return 403 if password is incorrect', async () => {
            const req = { body: { username: 'testuser', password: 'wrongpassword' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            user.findOne.mockResolvedValue({
                username: 'testuser',
                password: 'hashedPassword',
                role: 'user'
            });

            bcrypt.compare.mockResolvedValue(false);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid username or password' });
        });
    });
});
