import { Schema, Document, models, model } from "mongoose";

// This extends properties from the default documents that the MongoDB has
export interface IQuestion extends Document {
  title: string;
  content: string;
  // A reference to another database model
  tags: Schema.Types.ObjectId[];
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  answers: Schema.Types.ObjectId[];
  // A referece to a singe database model
  author: Schema.Types.ObjectId;
  views: number;
  createdAt: Date;
}

// Notice how the "type" is in caps
const QuestionsSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  // Array of type Schema.Types.ObjectId and a reference to a Tag model
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  views: { type: Number, default: 0 },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

// First CHECKS if model already exists otherwise, CREATE a new model
const Question = models.Question || model("Question", QuestionsSchema);

export default Question;
