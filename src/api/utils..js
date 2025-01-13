import axios from "axios";

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
