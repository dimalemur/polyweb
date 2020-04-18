import mongoose, { Schema } from 'mongoose';

const VisitsSchema = new Schema({
  date: {
    type: Date,
    require: true,
    max: '2219-09-01',
    min: '1999-12-08',
  },
  section: { type: String, require: true },
});

const SportVisits = new Schema({
  semester: { type: Number, require: true, unique: true },
  countNeed: { type: Number, require: true },
  count: { type: Number, require: true },
  visits: { type: [VisitsSchema], require: true, default: [] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('SportVisits', SportVisits);
