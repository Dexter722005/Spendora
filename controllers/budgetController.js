const Budget = require("../models/Budget");

exports.setBudget = async (req, res) => {
  const budget = await Budget.create({
    ...req.body,
    userId: req.user
  });
  res.json(budget);
};

exports.getBudgets = async (req, res) => {
  const budgets = await Budget.find({ userId: req.user });
  res.json(budgets);
};