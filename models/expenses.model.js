import mongoose from 'mongoose'
const expensesSchema = mongoose.Schema({
     expenseName: {
          type: String,
          required: true
     },
     expenseAmount: {
          type: Number,
          required: true
     },
     author: {
          type: mongoose.Types.ObjectId,
          ref: 'user',
          required: false
     }
}, { timestamps: true })

const Expense = mongoose.model('expense', expensesSchema)

export default Expense