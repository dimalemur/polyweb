import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({
  name: { type: String, require: true },
  url: { type: String, require: true },
});

const PageSchema = new Schema({
  name: { type: String, require: true, default: '' },
  faq: { type: String, require: true, default: '' },
  course: { type: String, require: true, default: null },
  group: { type: String, require: true, default: '' },
  specialty: { type: String, require: true, default: '' },
  specialization: { type: String, require: true, default: '' },
  period: { type: Number, require: true, default: null },
  form: { type: String, require: true, default: '' },
  financing: { type: String, require: true, default: '' },
  level: { type: String, require: true, default: '' },
  year: { type: String, require: true, default: '' },
  email: { type: String, require: true, default: '' },
  tel: { type: String, require: true, default: '' },
  orders: { type: [orderSchema], require: true, default: [] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
});

export default mongoose.model('Page', PageSchema);
