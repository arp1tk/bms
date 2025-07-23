const mongoose = require("mongoose");

const bankAccountSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ifscCode: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true, // optional: to avoid duplicate accounts
    },
    accountHolderName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BankAccount = mongoose.model("BankAccount", bankAccountSchema);

module.exports = BankAccount;
