const Transaction = require("../models/Transaction");

exports.getInsights = async (req, res) => {
  try {
    const data = await Transaction.find({ userId: req.user });

    // Separate income & expense
    const expenses = data.filter(t => t.type === "expense");
    const income = data.filter(t => t.type === "income");

    const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    // Category aggregation (ONLY expenses)
    const categoryMap = {};
    expenses.forEach(t => {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    });

    // Highest category
    let highestCategory = "None";
    if (Object.keys(categoryMap).length > 0) {
      highestCategory = Object.keys(categoryMap).reduce((a, b) =>
        categoryMap[a] > categoryMap[b] ? a : b
      );
    }

    // Prediction
    const avgDaily = totalExpense / 30;
    const prediction = avgDaily * 30;

    // 🧠 SMART INSIGHTS
    let insights = [];

    if (totalExpense > totalIncome) {
      insights.push("⚠️ You are spending more than you earn");
    }

    if (balance > 0) {
      insights.push("✅ You are saving money this month");
    }

    if (categoryMap["food"] > 0.4 * totalExpense) {
      insights.push("🍔 Food expenses are too high");
    }

    if (totalExpense > 5000) {
      insights.push("💡 Consider reducing unnecessary spending");
    }

    if (balance < 1000) {
      insights.push("⚠️ Your savings are very low");
    }

    res.json({
      totalExpense,
      totalIncome,
      balance,
      highestCategory,
      prediction,
      insights
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};