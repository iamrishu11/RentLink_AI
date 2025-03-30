import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  property: { type: String, required: true },
  rentAmount: { type: String, required: true },
  paymentStatus: { type: String, default: "pending" }, // "paid" | "pending" | "overdue"
  score: { type: Number, default: 80 },
});

const Tenant = mongoose.model("Tenant", TenantSchema);
export default Tenant;
