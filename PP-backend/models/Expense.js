import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    // We will later add a 'userId' field to link expenses to a user
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    vendor: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: false, // This will be set by the AI, can be empty initially
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;