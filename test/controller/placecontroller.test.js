const { findall, save, findById, deleteById, update } = require('../../controller/PlaceController');
const Place = require('../../model/place');

jest.mock('../../model/place'); // Mock the Place model

describe('Place Controller', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return all places', async () => {
        // Arrange
        const places = [{ name: 'Place 1', description: 'Description 1' }];
        Place.find.mockResolvedValue(places);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Act
        await findall(req, res);

        // Assert
        expect(Place.find).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(places);
    });

    test('should save a new place', async () => {
        // Arrange
        const newPlace = {
            name: 'New Place',
            description: 'New Place Description',
            images: 'image.jpg',
        };

        Place.prototype.save.mockResolvedValue(newPlace);

        const req = {
            body: { name: 'New Place', description: 'New Place Description' },
            file: { originalname: 'image.jpg' },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Act
        await save(req, res);

        // Assert
        expect(Place.prototype.save).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(201);
        //expect(res.json).toHaveBeenCalledWith(newPlace);
    });

    test('should return a place by id', async () => {
        // Arrange
        const place = { name: 'Place 1', description: 'Description 1' };
        Place.findById.mockResolvedValue(place);

        const req = { params: { id: '123' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Act
        await findById(req, res);

        // Assert
        expect(Place.findById).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(place);
    });

    test('should return 404 when place is not found by id', async () => {
        // Arrange
        Place.findById.mockResolvedValue(null);

        const req = { params: { id: '123' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Act
        await findById(req, res);

        // Assert
        expect(Place.findById).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Place not found" });
    });

    test('should delete a place by id', async () => {
        // Arrange
        const place = { name: 'Place 1', description: 'Description 1' };
        Place.findByIdAndDelete.mockResolvedValue(place);

        const req = { params: { id: '123' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Act
        await deleteById(req, res);

        // Assert
        expect(Place.findByIdAndDelete).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Place deleted successfully" });
    });

    test('should return 404 when place to delete is not found', async () => {
        // Arrange
        Place.findByIdAndDelete.mockResolvedValue(null);

        const req = { params: { id: '123' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Act
        await deleteById(req, res);

        // Assert
        expect(Place.findByIdAndDelete).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Place not found" });
    });

    test('should update a place by id', async () => {
        // Arrange
        const updatedPlace = { name: 'Updated Place', description: 'Updated Description' };
        Place.findByIdAndUpdate.mockResolvedValue(updatedPlace);

        const req = {
            params: { id: '123' },
            body: { name: 'Updated Place', description: 'Updated Description' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Act
        await update(req, res);

        // Assert
        expect(Place.findByIdAndUpdate).toHaveBeenCalledWith('123', req.body, { new: true });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedPlace);
    });

    test('should return 404 when place to update is not found', async () => {
        // Arrange
        Place.findByIdAndUpdate.mockResolvedValue(null);

        const req = {
            params: { id: '123' },
            body: { name: 'Updated Place', description: 'Updated Description' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Act
        await update(req, res);

        // Assert
        expect(Place.findByIdAndUpdate).toHaveBeenCalledWith('123', req.body, { new: true });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Place not found" });
    });

});
