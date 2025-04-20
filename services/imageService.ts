import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { ResponseType } from "@/types";
import axios from "axios";

const CLOUDINARY_CLOUD_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadFileToCloudinary = async (
  file: { uri?: string } | string,
  folderName: string
): Promise<ResponseType> => {
  try {
    if (typeof file == "string") {
      return { success: true, data: file };
    }
    if (file && file.uri) {
      const formatData = new FormData();
      formatData.append("file", {
        uri: file?.uri,
        name: file?.uri?.split("/").pop() || "file.jpg",
        type: "image/jpeg",
      } as any);
      formatData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formatData.append("folder", folderName);

      const response = await axios.post(CLOUDINARY_CLOUD_API_URL, formatData, {
        headers: {
          Content_Type: "multipart/form-data",
        },
      });
      console.log("upload image result: ", response?.data);

      return { success: true, data: response?.data?.secure_url };
    }
    return { success: true };
  } catch (error: any) {
    console.log("error upload filr: ", error);
    return { success: false, msg: error.message || "Could not upload file" };
  }
};

export const getProfileImage = (file: any) => {
  if (file && typeof file == "string") return file;
  if (file && typeof file == "object") return file.uri;

  return require("../assets/images/defaultAvatar.png");
};
