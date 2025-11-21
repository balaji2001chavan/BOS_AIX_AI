import Profile from "../models/Profile.js";

// नवीन प्रोफाइल तयार करणे
export async function createProfile(req, res) {
  try {
    const { userId, username, bio } = req.body;

    if (!userId || !username) {
      return res.status(400).json({ error: "userId आणि username आवश्यक आहेत" });
    }

    const existing = await Profile.findOne({ userId });
    if (existing) {
      return res.status(400).json({ error: "या user साठी profile आधीच आहे" });
    }

    const profile = await Profile.create({
      userId,
      username,
      bio: bio || ""
    });

    return res.json({ status: "ok", profile });
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}

// userId वरून प्रोफाइल मिळवणे
export async function getProfile(req, res) {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "userId आवश्यक आहे" });
    }

    const profile = await Profile.findOne({ userId });
    return res.json({ status: "ok", profile });
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}

// प्रोफाइल update करणे
export async function updateProfile(req, res) {
  try {
    const { userId, bio, avatarUrl } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId आवश्यक आहे" });
    }

    const updates = {};
    if (bio !== undefined) updates.bio = bio;
    if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      updates,
      { new: true }
    );

    return res.json({ status: "ok", profile });
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
