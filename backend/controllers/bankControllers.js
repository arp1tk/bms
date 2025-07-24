const BankAccount = require("../models/bankAccModel");
const User = require("../models/userModel");


const addBankAccount = async (req, res) => {
  try {
    const { userId, ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;

   
    if (!userId || !ifscCode || !branchName || !bankName || !accountNumber || !accountHolderName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAccount = new BankAccount({
      user: userId,
      ifscCode,
      branchName,
      bankName,
      accountNumber,
      accountHolderName,
    });

    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getBankAccounts = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const accounts = await BankAccount.find({ user: userId });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateBankAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const account = await BankAccount.findById(id);
    if (!account) {
      return res.status(404).json({ message: "Bank account not found" });
    }


    const updatedAccount = await BankAccount.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteBankAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const account = await BankAccount.findById(id);
    if (!account) {
      return res.status(404).json({ message: "Bank account not found" });
    }

    await BankAccount.findByIdAndDelete(id);
    res.status(200).json({ message: "Bank account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getAllBankAccounts = async (req, res) => {
  try {
    const accounts = await BankAccount.find().populate("user", "name email");

    res.status(200).json({
      message: "All bank accounts fetched successfully",
      accounts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const searchBankAccounts = async (req, res) => {
  try {
    const { bankName, ifscCode, accountHolderName, branchName, username } = req.query;
    let query = {};

    if (bankName) query.bankName = new RegExp(bankName, "i");
    if (ifscCode) query.ifscCode = new RegExp(ifscCode, "i");
    if (accountHolderName) query.accountHolderName = new RegExp(accountHolderName, "i");
    if (branchName) query.branchName = new RegExp(branchName, "i");

   
    if (username) {
      const user = await User.findOne({ name: new RegExp(username, "i") });
      if (user) query.user = user._id;
      else return res.status(404).json({ message: "User not found with given username" });
    }

    const accounts = await BankAccount.find(query).populate("user", "name email");

    res.status(200).json({
      message: "Filtered bank accounts fetched successfully",
      accounts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addBankAccount,
  getBankAccounts,
  updateBankAccount,
  deleteBankAccount,
  getAllBankAccounts,
  searchBankAccounts
};
