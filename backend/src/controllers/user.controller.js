import User from "../models/User.js";

export const getRecommendedUsers = async function (req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        {
          $_id: { $ne: currentUserId },
        }, //exclude current user
        { $_id: { $nin: currentUser.friends } }, //exclude current users friends
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyFriends = async function (req, res) {
  try {
    const user = await User.findById(req.user._id)
      .select("friends")
      .populate(
        "friends",
        "fullName  profilePic nativeLanguage learningLanguage"
      );
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getMyFriendsController ", error);
    res.status(500).json({ message: "Intrnal Server Error" });
  }
};
