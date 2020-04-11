import mongoose, { Schema } from 'mongoose';

const schoolGradeSchema = new Schema({
  name: { type: String, require: true },
  type: { type: String, require: true },
  grade: { type: String, require: true },
});

const GradesSchema = new Schema({
  semester: { type: Number, require: true, unique: true },
  orders: { type: [schoolGradeSchema], require: true, default: [] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Grades', GradesSchema);
