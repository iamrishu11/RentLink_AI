import mongoose from 'mongoose';

const activeAccountSchema = new mongoose.Schema({
  tenant: { type: String, required: true },
  account: { type: String, required: true },
  status: { type: String, default: "Active" },
  payeeId: { type: String, required: true },
});

const ActiveAccount = mongoose.model('ActiveAccount', activeAccountSchema);

export { ActiveAccount };
