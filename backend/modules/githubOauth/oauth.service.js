const AuthorSchema = require("../author/author.schema")

const findOrCreateSocialUser = async (profile, provider) => {

  const email = profile.emails?.[0]?.value;
  if (!email) throw new Error("Email not provided by social provider");

  let author = await AuthorSchema.findOne({ email });

  if (!author) {
    const [name, ...surnameParts] = (profile.displayName || "Social User").split(" ");
    const surname = surnameParts.join(" ") || "User";

    author = new AuthorSchema({
      name,
      surname,
      email,
      avatar: profile.photos?.[0]?.value,
      [`${provider}Id`]: profile.id,
    });

    await author.save();
  } else {
    if (!author[`${provider}Id`]) {
      author[`${provider}Id`] = profile.id;
      await author.save();
    }
  }

  return author;
};

module.exports = { findOrCreateSocialUser };