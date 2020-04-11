import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({
  name: { type: String, require: true },
  url: { type: String, require: true },
});

const PageSchema = new Schema({
  name: { type: String, require: true },
  faq: { type: String, require: true },
  course: { type: String, require: true },
  group: { type: String, require: true },
  specialty: { type: String, require: true },
  specialization: { type: String, require: true },
  period: { type: Number, require: true },
  form: { type: String, require: true },
  financing: { type: String, require: true },
  level: { type: String, require: true },
  year: { type: String, require: true },
  email: { type: String, require: true },
  tel: { type: String, require: true },
  orders: { type: [orderSchema], require: true, default: [] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
});

export default mongoose.model('Page', PageSchema);
