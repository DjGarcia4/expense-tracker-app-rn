import { ResponseType, WalletType } from "@/types";
import { uploadFileToCloudinary } from "./imageService";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "@/config/firebase";

export const createOrUpdateWallet = async (
  walletData: Partial<WalletType>
): Promise<ResponseType> => {
  try {
    let walletToSave = { ...walletData };
    if (walletData.image && walletData?.image?.uri) {
      const imageUploadedRes = await uploadFileToCloudinary(
        walletData.image,
        "wallets"
      );
      if (!imageUploadedRes.success) {
        return {
          success: false,
          msg: imageUploadedRes.msg || "Failed to upload wallet icon",
        };
      }

      walletToSave.image = imageUploadedRes.data;
    }
    if (!walletData?.id) {
      // new wallet
      walletToSave.amount = 0;
      walletToSave.totalIncome = 0;
      walletToSave.totalExpenses = 0;
      walletToSave.created = new Date();
    }
    const walletRef = walletData?.id
      ? doc(firestore, "wallets", walletData?.id)
      : doc(collection(firestore, "wallets"));
    await setDoc(walletRef, walletToSave, { merge: true }); // updates only the data proviided
    return { success: true, data: { ...walletToSave, id: walletRef.id } };
  } catch (error: any) {
    console.log("Error creasting or updating wallet: ", error);
    return { success: false, msg: error.message };
  }
};
