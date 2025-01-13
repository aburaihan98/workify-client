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
  axiosPublic.post(
    `${import.meta.env.VITE_API_URL}/users/${result?.user?.email}`,
    {
      name: result?.user?.displayName,
      email: result?.user?.email,
      photo: result?.user?.photoURL,
      role: "employee",
    }
  );
};
