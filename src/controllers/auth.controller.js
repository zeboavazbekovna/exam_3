import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users = [];

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Bu foydalanuvchi allaqachon mavjud' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { username, password: hashedPassword, role: 'user' }; // Default role as 'user'
  users.push(newUser);

  res.status(201).json({ message: 'Roʻyxatdan oʻtish muvaffaqiyatli', user: { username, role: newUser.role } });
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Foydalanuvchi topilmadi' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Noto‘g‘ri parol' });
  }

  const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ message: 'Kirish muvaffaqiyatli', token });
};

export const changePassword = async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Foydalanuvchi topilmadi' });
  }

  const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isOldPasswordValid) {
    return res.status(400).json({ message: 'Eski parol noto‘g‘ri' });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  res.json({ message: 'Parol muvaffaqiyatli yangilandi' });
};
