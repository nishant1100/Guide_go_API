const User = require('../../model/user'); // Adjusted import path
const { findall, save, findById, deleteById, update } = require('../../controller/UserController'); // Adjusted import path

jest.mock('../../model/user'); // Mock the User model

describe('User Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('findall', () => {
        it('should return all users', async () => {
            const mockUsers = [{ _id: '1', name: 'John Doe' }, { _id: '2', name: 'Jane Doe' }];
            User.find.mockResolvedValue(mockUsers);

            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await findall(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUsers);
        });

        it('should handle errors', async () => {
            User.find.mockRejectedValue(new Error('Database error'));

            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await findall(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });
    });

    describe('save', () => {
        it('should save a new user', async () => {
            const req = { body: { name: 'John Doe' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            User.prototype.save = jest.fn().mockResolvedValue({ _id: '1', name: 'John Doe' });

            await save(req, res);

            expect(res.status).not.toHaveBeenCalledWith(500); // Ensure no errors
        });

        it('should handle save errors', async () => {
            User.prototype.save = jest.fn().mockRejectedValue(new Error('Save failed'));

            const req = { body: { name: 'John Doe' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await save(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Save failed' });
        });
    });

    describe('findById', () => {
        it('should return a user by ID', async () => {
            const mockUser = { _id: '1', name: 'John Doe' };
            User.findById.mockResolvedValue(mockUser);

            const req = { params: { id: '1' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await findById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('should handle errors when user is not found', async () => {
            User.findById.mockRejectedValue(new Error('User not found'));

            const req = { params: { id: '999' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await findById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
        });
    });

    describe('deleteById', () => {
        it('should delete a user by ID', async () => {
            User.findByIdAndDelete.mockResolvedValue({});

            const req = { params: { id: '1' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await deleteById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Data deleted successfully' });
        });

        it('should handle errors during delete', async () => {
            User.findByIdAndDelete.mockRejectedValue(new Error('Delete failed'));

            const req = { params: { id: '1' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await deleteById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Delete failed' });
        });
    });

    describe('update', () => {
        it('should update a user by ID', async () => {
            const mockUpdatedUser = { _id: '1', name: 'Updated Name' };
            User.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser);

            const req = { params: { id: '1' }, body: { name: 'Updated Name' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await update(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUpdatedUser);
        });

        it('should handle errors during update', async () => {
            User.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'));

            const req = { params: { id: '1' }, body: { name: 'Updated Name' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await update(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Update failed' });
        });
    });
});
