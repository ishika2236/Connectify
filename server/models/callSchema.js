const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  initiator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  duration: { type: Number, required: true, default: 0 },
  callType: { type: String, enum: ['audio', 'video', 'screen-share'], default: 'video' },
  callStatus: { type: String, enum: ['completed', 'missed', 'ringing', 'rejected'], default: 'ringing' },
  participantStatus: [{
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['joined', 'left', 'rejected'], default: 'joined' },
    joinedAt: { type: Date },
    leftAt: { type: Date }
  }],
  timestamp: { type: Date, default: Date.now },
  endTime: { type: Date },
});

const Call = mongoose.model('Call', callSchema);

module.exports = Call;
