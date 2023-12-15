const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      datedebut: {
        type: String,
        required: true,
      },
      datefin: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        enum: ["completed", "inprogress", "incompleted"],
        default: "incompleted",
      },
      employee: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
      },
      isCheckin:{
        type:Boolean,
        default:false,
      },
      space:{
        type:String,
        required:true,
      }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Task", taskSchema, "tasks");