"use server";

import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Question from "@/database/question.model";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, userId } = params;

    // Update view count for the question
    const question = await Question.findByIdAndUpdate(
      questionId,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction)
        return console.log("User has already viewed question.");

      // Create interaction
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
        tags: question.tags,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
