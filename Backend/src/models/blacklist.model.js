import { Schema, model } from "mongoose";

const blacklistSchema = new Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
    },
  },
  { timestamps: true },
);

const BlacklistModel = model("Blacklist", blacklistSchema);

export { BlacklistModel };
