const { findall, save, getBookingById } = require('../../controller/HireController');
const Hire = require('../../model/hire');
const Guide = require('../../model/guide');

jest.mock('../../model/hire');
jest.mock('../../model/guide');

describe('Hire Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return all hires', async () => {
        Hire.find.mockResolvedValue([{ userId: 'user1', pickupLocation: 'Location A' }]);

        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await findall(req, res);

        expect(Hire.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('should save a new hire and mark guide as unavailable', async () => {
        const guide = { _id: 'guide1', avaiable: 'yes', save: jest.fn() };
        const hiring = { _id: 'hire1', save: jest.fn() };
        const populatedHiring = { _id: 'hire1', userId: {}, guideId: {} };

        Guide.findById.mockResolvedValue(guide);
        Hire.prototype.save.mockResolvedValue(hiring);
        Hire.findById.mockResolvedValue(populatedHiring);

        const req = {
            body: {
                userId: 'user1',
                pickupLocation: 'Location B',
                pickupDate: '2025-03-05',
                pickupTime: '10:00 AM',
                noofPeople: 4,
                pickupType: 'car',
                guideId: 'guide1'
            }
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await save(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(populatedHiring);
    });

    test('should return 400 if guideId is missing', async () => {
        const req = { body: { userId: 'user1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await save(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "GuideId is required" });
    });

    test('should return 404 if guide not found', async () => {
        Guide.findById.mockResolvedValue(null);

        const req = { body: { guideId: 'guide1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await save(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Guide not found" });
    });

    test('should return booking by id', async () => {
        const booking = { _id: 'booking1', userId: {}, guideId: {} };
        Hire.findById.mockResolvedValue(booking);

        const req = { params: { bookingId: 'booking1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await getBookingById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(booking);
    });

    test('should return 404 if booking not found', async () => {
        Hire.findById.mockResolvedValue(null);

        const req = { params: { bookingId: 'booking1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await getBookingById(req, res);

        //expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Booking not found" });
    });

    test('should handle error during findall', async () => {
        Hire.find.mockImplementation(() => {
            throw new Error('Database error');
        });

        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await findall(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });

    test('should handle error during save', async () => {
        Guide.findById.mockImplementation(() => {
            throw new Error('DB error');
        });

        const req = { body: { guideId: 'guide1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await save(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });

    test('should handle error during getBookingById', async () => {
        Hire.findById.mockImplementation(() => {
            throw new Error('Database failure');
        });

        const req = { params: { bookingId: 'booking1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await getBookingById(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch booking" });
    });
});
