import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  tenant: { type: String, required: true },
  due: { type: String, required: true },
  type: { type: String, required: true }, // "Due Soon" or "Overdue"
  channel: { type: String, required: true }, // "Email", "SMS"
  lastSent: { type: Date }, // Stores last sent timestamp
});

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;
