import express from "express";
import Tenant from "../models/Tenant.js"; // Add `.js` extension

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name, email, phone, property, rentAmount } = req.body;
  const newTenant = new Tenant({ name, email, phone, property, rentAmount });

  try {
    await newTenant.save();
    res.status(201).json(newTenant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Tenant.findByIdAndDelete(req.params.id);
    res.json({ message: "Tenant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
