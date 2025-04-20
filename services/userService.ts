import { firestore } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageService";

export const updateUser = async (
  uid: string,
  updatedData: UserDataType
): Promise<ResponseType> => {
  try {
    if (updatedData.image && updatedData?.image?.uri) {
      const imageUploadedRes = await uploadFileToCloudinary(
        updatedData.image,
        "users"
      );
      if (!imageUploadedRes.success) {
        return {
          success: false,
          msg: imageUploadedRes.msg || "Failed to upload image",
        };
      }
      updatedData.image = imageUploadedRes.data;
    }

    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, updatedData);

    return { success: true, msg: "Usuario actualizado correctamente" };
  } catch (error: any) {
    console.log("error updating user:", error);
    return { success: false, msg: error?.message };
  }
};
