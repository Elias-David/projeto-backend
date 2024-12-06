const UserService = require('../../../src/services/UserService');
const User = require('../../../src/models/User');

jest.mock('../../../src/models/User');

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('should return user when found', async () => {
      const mockUser = {
        id: 1,
        firstname: 'John',
        surname: 'Doe',
        email: 'john@example.com'
      };

      User.findByPk.mockResolvedValue(mockUser);

      const result = await UserService.getUserById(1);

      expect(User.findByPk).toHaveBeenCalledWith(1, {
        attributes: ['id', 'firstname', 'surname', 'email']
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw error when user not found', async () => {
      User.findByPk.mockResolvedValue(null);

      await expect(UserService.getUserById(999))
        .rejects
        .toThrow('User not found');
    });
  });

  describe('createUser', () => {
    it('should create user when data is valid', async () => {
      const userData = {
        firstname: 'John',
        surname: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };

      const mockCreatedUser = {
        id: 1,
        ...userData
      };

      User.create.mockResolvedValue(mockCreatedUser);

      const result = await UserService.createUser(userData);

      expect(User.create).toHaveBeenCalledWith({
        firstname: userData.firstname,
        surname: userData.surname,
        email: userData.email,
        password: userData.password
      });

      expect(result).toEqual({
        id: mockCreatedUser.id,
        firstname: userData.firstname,
        surname: userData.surname,
        email: userData.email
      });
    });

    it('should throw error when passwords do not match', async () => {
      const userData = {
        firstname: 'John',
        surname: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'differentpassword'
      };

      await expect(UserService.createUser(userData))
        .rejects
        .toThrow('Passwords do not match');

      expect(User.create).not.toHaveBeenCalled();
    });
  });
});