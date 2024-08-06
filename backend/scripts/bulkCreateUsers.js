const axios = require("axios");
const { faker } = require("@faker-js/faker");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const apiEndpoint = "http://localhost:3000/api/register"; // Replace with your actual endpoint
const numberOfUsers = 10; // Number of users to create

const downloadImage = async (url, filepath) => {
  const response = await axios({
    url,
    responseType: "stream",
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on("finish", () => resolve())
      .on("error", (e) => reject(e));
  });
};

const createUser = async (user, userEmail) => {
  try {
    const response = await axios.post(apiEndpoint, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(`User ${userEmail} created successfully`);
  } catch (error) {
    console.error(
      `Error creating user ${userEmail}:`,
      error.response?.data || error.message
    );
  }
};

const generateRandomUser = async () => {
  const formData = new FormData();
  const name = faker.person.fullName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const bio = faker.lorem.sentence();
  const location = JSON.stringify([
    faker.location.latitude(),
    faker.location.longitude(),
  ]);

  // Generate a random avatar URL
  const avatarUrl = faker.image.avatar();
  const avatarPath = path.join(__dirname, `temp_${Date.now()}.jpg`);

  // Download the avatar image
  await downloadImage(avatarUrl, avatarPath);

  // Append data to FormData
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("bio", bio);
  formData.append("location", location);
  formData.append("avatars", fs.createReadStream(avatarPath), {
    filename: `avatar_${Date.now()}.jpg`,
  });

  return { formData, email, avatarPath };
};

const createUsersInBulk = async () => {
  for (let i = 0; i < numberOfUsers; i++) {
    const { formData, email, avatarPath } = await generateRandomUser();
    await createUser(formData, email);

    // Clean up the downloaded avatar image
    fs.unlinkSync(avatarPath);
  }
};

createUsersInBulk()
  .then(() => {
    console.log("Bulk user creation completed.");
  })
  .catch((error) => {
    console.error("Error during bulk user creation:", error.message);
  });
