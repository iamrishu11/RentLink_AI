// routes/activeaccounts.js

import express from 'express';
import { ActiveAccount } from '../models/activeaccounts.js';

const router = express.Router();

// POST endpoint to create a new virtual account
router.post('/', async (req, res) => {
    const { tenant, account, payeeId } = req.body;
  
    // Input validation
    if (!tenant || !account || !payeeId) {
      return res.status(400).json({ message: 'Missing required fields (tenant, account, or payeeId)' });
    }
  
    try {
      // Log the incoming request data for debugging purposes
      console.log('Incoming data for account creation:', req.body);
  
      // Create a new virtual account and save it to the database
      const newAccount = new ActiveAccount({ tenant, account, payeeId });
  
      // Save the new account to the database
      await newAccount.save();
  
      // Log successful account creation
      console.log('Account created successfully:', newAccount);
  
      // Return the newly created account
      return res.status(201).json(newAccount);
    } catch (error) {
      // Log the error with a detailed message
      console.error('Error creating account:', error.message || error);
  
      // Check if the error is due to a database issue (e.g., schema validation error)
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error: ' + error.message });
      }
  
      // Send a generic error message if the issue is not related to validation
      return res.status(500).json({ message: 'Error creating virtual account. Please try again later.' });
    }
});
  
  

// GET endpoint to fetch all active virtual accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await ActiveAccount.find();
    return res.status(200).json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return res.status(500).json({ message: 'Error fetching accounts' });
  }
});

export default router;
