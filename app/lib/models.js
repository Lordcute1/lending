import mongoose from "mongoose";

// Define the loan schema
const loanSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  repaid: { type: Boolean, default: false },
});

// Define the transaction schema
const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Define the customer schema
const customerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  adress: { type: String, required: true },
  isActive: { type: Boolean },
  beneficiaryName: { type: String, required: true },
  beneficiaryBday: { type: String, required: true },
  beneficiaryRelation: { type: String, required: true },
  beneficiaryAge: { type: Number, required: true },
  balance: { type: Number, default: 0 },
  loans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Loan" }],
  transactionHistory: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
  ],
});

// Define the collector schema
const collectorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  adress: { type: String, required: true },
  customers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
  transactionHistory: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
  ],
});

// Define the admin schema
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastName: { type: String },
  firstName: { type: String },
  middleName: { type: String },
  role: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Define the superuser schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }],
  },
  { timestamps: true }
);

// Create models based on the schemas
export const Loan = mongoose.models.Loan || mongoose.model("Loan", loanSchema);
export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
export const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);
export const Collector =
  mongoose.models.Collector || mongoose.model("Collector", collectorSchema);
export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export const User = mongoose.models.User || mongoose.model("User", userSchema);
