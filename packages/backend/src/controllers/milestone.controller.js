// packages/backend/src/controllers/milestone.controller.js
import { Milestone } from "../models/Milestone.js";
import { Idea } from "../models/Idea.js";

export const createMilestone = async (req, res, next) => {
  try {
    const { ideaId, title, description, dueDate } = req.body;

    const idea = await Idea.findOne({ _id: ideaId, owner: req.user._id });
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    const ms = await Milestone.create({
      idea: ideaId,
      title,
      description,
      dueDate
    });

    res.status(201).json(ms);
  } catch (err) {
    next(err);
  }
};

export const updateMilestoneStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // PLANNED | IN_PROGRESS | COMPLETED

    const ms = await Milestone.findById(id).populate("idea");
    if (!ms || String(ms.idea.owner) !== String(req.user._id)) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    ms.status = status;
    await ms.save();

    res.json(ms);
  } catch (err) {
    next(err);
  }
};

export const getIdeaMilestones = async (req, res, next) => {
  try {
    const { ideaId } = req.params;

    const idea = await Idea.findOne({ _id: ideaId, owner: req.user._id });
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    const milestones = await Milestone.find({ idea: ideaId }).sort({
      dueDate: 1
    });

    res.json(milestones);
  } catch (err) {
    next(err);
  }
};

