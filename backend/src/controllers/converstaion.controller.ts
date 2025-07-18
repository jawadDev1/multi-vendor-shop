import asyncHandler from "#middleware/asyncHandler.js";
import { ConversationModel } from "#models/conversation.model.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import { generateRandomString, validateBody } from "#utils/index.js";
import { Request, Response, NextFunction } from "express";

const handleCreateConversation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const isValid = validateBody(body);
      if (!isValid) return next(new ErrorHandler("Invalid Fields", 400));

      const isExists = await ConversationModel.findOne({
        group_title: body.group_title,
      });

      if (isExists) {
        return res.status(200).json({
          success: true,
          message: "conversation get successfully",
          data: isExists,
        });
      }

      const { sellerId } = body;

      const userId = req.user?.id;
      const group_title =
        generateRandomString(4) + userId + generateRandomString(4);
      const conversation = await ConversationModel.create({
        group_title,
        seller: sellerId,
        user: userId,
      });

      return res.status(201).json({
        success: true,
        message: "conversation created successfully",
        data: conversation,
      });
    } catch (error) {
      console.log("Error in handleCreateConversation :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleGetSellerConversations = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conversations = await ConversationModel.find({
        seller: req.user?.id,
      })
        .populate({ path: "user", select: "-_id name email profile" })
        .select("-seller -last_message_id")
        .sort({ updatedAt: -1, createdAt: -1 });

      return res.status(201).json({
        success: true,
        message: "seller conversations fetched successfully",
        data: conversations,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error in handleGetSellerConversations :: ", error.message);
      } else {
        console.log("Error in handleGetSellerConversations :: ", error);
      }
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleGetUserConversations = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conversations = await ConversationModel.find({
        user: req.user?.id,
      })
        .populate({ path: "seller", select: "-_id name email profile" })
        .select("-user -last_message_id")
        .sort({ updatedAt: -1, createdAt: -1 });

      return res.status(201).json({
        success: true,
        message: "user conversations fetched successfully",
        data: conversations,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error in handleGetUserConversations :: ", error.message);
      } else {
        console.log("Error in handleGetUserConversations :: ", error);
      }
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

export {
  handleCreateConversation,
  handleGetSellerConversations,
  handleGetUserConversations,
};
