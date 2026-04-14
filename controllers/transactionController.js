const Transaction = require("../models/Transaction");

exports.createTransaction = async (req, res) => {
  const tx = await Transaction.create({
    ...req.body,
    userId: req.user
  });
  res.json(tx);
};

exports.getTransactions = async (req, res) => {
  const data = await Transaction.find({ userId: req.user });
  res.json(data);
};

exports.updateTransaction = async (req, res) => {
  const tx = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(tx);
};

exports.deleteTransaction = async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};