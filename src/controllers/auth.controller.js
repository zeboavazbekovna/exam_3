import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/auth.models.js';

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper function to send OTP email
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

class AuthController {
  // Register User
  async registerUser(req, res) {
    const { email, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Bu foydalanuvchi allaqachon mavjud' });
      }

      // Generate OTP
      const otp = crypto.randomInt(100000, 999999).toString();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with OTP and OTP expiration
      const newUser = await User.create({ 
        email, 
        password: hashedPassword, 
        otp, 
        otpExpires 
      });

      // Send OTP email
      await sendOtpEmail(email, otp);

      res.status(201).json({ message: 'Roʻyxatdan oʻtish muvaffaqiyatli, emailga OTP yuborildi', user: { email: newUser.email } });
    } catch (error) {
      res.status(500).json({ message: 'Serverda xatolik yuz berdi', error: error.message });
    }
  }

  // Verify OTP and complete registration
  async verifyOtp(req, res) {
    const { email, otp } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Foydalanuvchi topilmadi' });
      }

      if (user.otp !== otp) {
        return res.status(400).json({ message: 'Noto‘g‘ri OTP' });
      }

      if (new Date() > user.otpExpires) {
        return res.status(400).json({ message: 'OTP muddati tugagan' });
      }

      // Clear OTP and OTP expiration
      user.otp = null;
      user.otpExpires = null;
      await user.save();

      // Return the user's information
      res.json({ 
        message: 'OTP muvaffaqiyatli tasdiqlandi',
        user: {
          id: user.id,
          email: user.email,
          username: user.username, // Add other user properties as needed
          balance: user.balance
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Serverda xatolik yuz berdi', error: error.message });
    }
  }

  // Login User
  async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Foydalanuvchi topilmadi' });
      }

      // Check if the password is valid
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Noto‘g‘ri parol' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ message: 'Kirish muvaffaqiyatli', token });
    } catch (error) {
      res.status(500).json({ message: 'Serverda xatolik yuz berdi', error: error.message });
    }
  }

  // Change Password
  async changePassword(req, res) {
    const { email, oldPassword, newPassword } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Foydalanuvchi topilmadi' });
      }

      // Check if the old password is valid
      const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isOldPasswordValid) {
        return res.status(400).json({ message: 'Eski parol noto‘g‘ri' });
      }

      // Hash the new password and update it
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      res.json({ message: 'Parol muvaffaqiyatli yangilandi' });
    } catch (error) {
      res.status(500).json({ message: 'Serverda xatolik yuz berdi', error: error.message });
    }
  }

  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll(); // Find all users in the database
      res.json({ users });
    } catch (error) {
      res.status(500).json({ message: 'Serverda xatolik yuz berdi', error: error.message });
    }
  }

  // Get user by ID
  async getUserById(req, res) {
    const { id } = req.params; // Get the user ID from URL parameters

    try {
      const user = await User.findByPk(id); // Find the user by primary key (ID)
      if (!user) {
        return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Serverda xatolik yuz berdi', error: error.message });
    }
  }

  // Delete User
  async deleteUser(req, res) {
    const { id } = req.params; // Get the user ID from URL parameters

    try {
      const user = await User.findByPk(id); // Find the user by primary key (ID)
      if (!user) {
        return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
      }

      await user.destroy(); // Delete the user
      res.json({ message: 'Foydalanuvchi muvaffaqiyatli o‘chirildi' });
    } catch (error) {
      res.status(500).json({ message: 'Serverda xatolik yuz berdi', error: error.message });
    }
  }
}

export default new AuthController();
