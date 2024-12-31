const AsyncHandler = require('express-async-handler');
const Call = require('../models/callSchema');

const updateCallHistory = AsyncHandler(async(roomId, participants,duration)=>{
    try {
        
        const callHistory = new Call({roomId, participants, duration});
        await callHistory.save();
    } catch (error) {
        console.error('Error saving call history:', error);
    }
})
const updateCallStatus =AsyncHandler( async (roomId, status, user) => {
    try {
      await Call.updateOne(
        { roomId, participants: user.id },
        { $set: { callStatus: status } }
      );
    } catch (error) {
      console.error('Error updating call status:', error);
    }
});
const getCallHistory =AsyncHandler (async (req, res) => {
    const { roomId } = req.params;
  
    try {
      const callHistory = await Call.find({ roomId });
      res.status(200).json(callHistory);
    } catch (error) {
      console.error('Error fetching call history:', error);
      res.status(500).send('Error fetching call history');
    }
});

module.exports = {updateCallHistory, updateCallStatus, getCallHistory};
