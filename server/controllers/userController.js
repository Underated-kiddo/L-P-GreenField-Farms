const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (req.file) user.profilePic = `/uploads/${req.file.filename}`;

  await user.save();
  res.json(user);
};

module.exports = { updateProfile };