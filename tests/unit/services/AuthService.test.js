const AuthService = require('../../../src/services/AuthService');
const User = require('../../../src/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../../src/models/User');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateToken', () => {
    it('should generate token when credentials are valid', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword'
      };
      
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compareSync.mockReturnValue(true);
      jwt.sign.mockReturnValue('generated.token.here');

      const token = await AuthService.generateToken('test@example.com', 'password123');

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' }
      });
      expect(bcrypt.compareSync).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockUser.id, email: mockUser.email },
        process.env.APP_KEY_TOKEN,
        { expiresIn: '1h' }
      );
      expect(token).toBe('generated.token.here');
    });

    it('should throw error when user not found', async () => {
      User.findOne.mockResolvedValue(null);

      await expect(AuthService.generateToken('wrong@example.com', 'password123'))
        .rejects
        .toThrow('Invalid credentials');
    });

    it('should throw error when password is incorrect', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword'
      };
      
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compareSync.mockReturnValue(false);

      await expect(AuthService.generateToken('test@example.com', 'wrongpassword'))
        .rejects
        .toThrow('Invalid credentials');
    });
  });
});