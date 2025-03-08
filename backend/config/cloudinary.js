const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: "sulthan-stores",
      api_key: "759154357132845",
      api_secret: "NLqKqodpptUHpH2d9DaXAvPLK9A",
    });
    console.log("Cloudinary connected successfully");
  } catch (error) {
    console.log(error);
  }
};
