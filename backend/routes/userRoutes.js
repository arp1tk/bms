const express = require('express');
const {registerUser , authUser} = require('../controllers/userControllers');
const { addBankAccount, getBankAccounts, updateBankAccount, deleteBankAccount } = require('../controllers/bankControllers');
const router = express.Router();

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.post("/addBank", addBankAccount);
router.get("/getBank", getBankAccounts);
router.put("/updateBank:id", updateBankAccount);
router.delete("/deleteBank:id", deleteBankAccount);

module.exports = router;