const EventSchema = {
  name: String,
  sport: String,
  minParticipants: Number,
  host: String,
  activity: String,
  success: String,
  description: String,
  price: Number,
  ratingsIds: [Number],        
  duration: Number,         
  locationAddress: String,         //schema
  typeOfAccess: String,
  startTime: Date,
  endTime: Date,
  participantsIds: [String]
};

module.exports = EventSchema;
