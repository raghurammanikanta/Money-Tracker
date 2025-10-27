
import mongoose from 'mongoose';
import {Schema} from 'mongoose'
const TransactionSchema = new Schema({
    nameFromInput:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,

    },
    description:{
        type:String,
        required:true,
    },
    datetime:{
        type:Date,
        required:true,

    }
})

export default mongoose.model('Transaction', TransactionSchema);