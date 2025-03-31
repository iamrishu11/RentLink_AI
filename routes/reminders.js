import express from "express";
import Reminder from "../models/Reminder.js";

const router = express.Router();

// Get all reminders
router.get("/", async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new reminder
router.post("/", async (req, res) => {
  try {
    const newReminder = new Reminder(req.body);
    await newReminder.save();
    res.status(201).json(newReminder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update `lastSent` field when reminders are sent
router.put("/update", async (req, res) => {
  try {
    const updates = req.body;
    for (let reminder of updates) {
      await Reminder.findByIdAndUpdate(reminder._id, { lastSent: new Date() });
    }
    res.json({ message: "Reminders updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
