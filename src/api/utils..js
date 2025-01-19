import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const axiosPublic = useAxiosPublic();
// after upload image return image url
export const uploadImageUrl = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  // send image to img bb
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`,
    formData
  );

  return data?.data?.display_url;
};

// save user in mongodb
export const saveUsr = async (result) => {
  const generateRandomBankAccount = () => {
    return `ACC${Math.floor(Math.random() * 1000000000)}`;
  };

  const generateRandomSalary = () => {
    return Math.floor(Math.random() * (100000 - 30000 + 1)) + 30000; // Generates a salary between 30,000 and 100,000
  };

  const generateRandomDesignation = () => {
    const designations = [
      "Sales Assistant",
      "Social Media Executive",
      "Digital Marketer",
      "Support Specialist",
      "HR Executive",
    ];
    return designations[Math.floor(Math.random() * designations.length)];
  };

  const userInfo = {
    name: result?.user?.displayName,
    email: result?.user?.email,
    photo: result?.user?.photoURL,
    role: "employee",
    bankAccountNo: generateRandomBankAccount(),
    salary: generateRandomSalary(),
    designation: generateRandomDesignation(),
  };

  axiosPublic.post(`/users/${result?.user?.email}`, userInfo);
};
