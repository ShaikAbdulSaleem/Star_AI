// packages/backend/src/controllers/user.controller.js
import { User } from "../models/User.js";

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-passwordHash");
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const {
      name,
      sectors,
      stagePreferences,
      mindsetTags,
      ticketSizeMin,
      ticketSizeMax,
      bio,
      avatarUrl
    } = req.body;

    const update = {
      ...(name && { name }),
      ...(sectors && { sectors }),
      ...(stagePreferences && { stagePreferences }),
      ...(mindsetTags && { mindsetTags }),
      ...(ticketSizeMin !== undefined && { ticketSizeMin }),
      ...(ticketSizeMax !== undefined && { ticketSizeMax }),
      ...(bio && { bio }),
      ...(avatarUrl && { avatarUrl })
    };

    const user = await User.findByIdAndUpdate(req.user._id, update, {
      new: true
    }).select("-passwordHash");

    res.json(user);
  } catch (err) {
    next(err);
  }
};

