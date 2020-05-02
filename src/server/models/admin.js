import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Создаем схему для аутенфикации
const AdminSchema = new Schema({
  login: {
    type: String, unique: true, lowercase: true, index: true,
  },
  password: String,
});

AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10); // соль для хеша
  const hash = await bcrypt.hash(this.password, salt); // хеш

  this.password = hash; // записываем вместо пароля его хеш
  next();
});

// сравнение входящего пароля с паролем пользователя
AdminSchema.methods.comparePasswords = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('Admin', AdminSchema);
