import asyncHandler from "#middleware/asyncHandler.js";
import { ConversationModel } from "#models/conversation.model.js";
import { MessageModel } from "#models/message.model.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import { validateBody } from "#utils/index.js";
import { Request, Response, NextFunction } from "express";

const handleCreateMessage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const isValid = validateBody(body);
      if (!isValid) return next(new ErrorHandler("Invalid Fields", 400));

      const isExists = await ConversationModel.findOne({
        group_title: body.group_title,
      });

      const { images, sender, conversation_id } = body;

      const message = await MessageModel.create({
        images: images ?? null,
        sender,
        conversation_id,
      });

      return res.status(201).json({
        success: true,
        message: "message created successfully",
        data: message,
      });
    } catch (error) {
      console.log("Error in handleCreateMessage :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleGetMessages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: conversation_id } = req.params;

      const messages = await MessageModel.find({
        conversation_id,
      });

      return res.status(200).json({
        success: true,
        message: "messages fetched successfully",
        data: messages,
      });
    } catch (error) {
      console.log("Error in handleCreateMessage :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

export { handleCreateMessage, handleGetMessages };
