import Profile from "../models/Profile.js";

export async function createProfile(req, res) {
  try {
    const { userId, username, bio } = req.body;

    const profile = await Profile.create({
      userId,
      username,
      bio
    });

    res.json({ status: "ok", profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getProfile(req, res) {
  try {
    const { userId } = req.query;
    const profile = await Profile.findOne({ userId });
    res.json({ status: "ok", profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const { userId, ...updates } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      updates,
      { new: true }
    );

    res.json({ status: "ok", profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
