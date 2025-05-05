import {
  Alert,
  ScrollView,
  ScrollViewComponent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import ModalWrapper from "@/components/ModalWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { Image } from "expo-image";
import { getProfileImage } from "@/services/imageService";
import * as Icons from "phosphor-react-native";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import { UserDataType, WalletType } from "@/types";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/authContext";
import { updateUser } from "@/services/userService";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import ImageUpload from "@/components/ImageUpload";
import { createOrUpdateWallet } from "@/services/walletService";

const WalletModal = () => {
  const [wallet, setWallet] = useState<WalletType>({
    name: "",
    image: "",
  });

  const { user, updateUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const oldWallet: { name: string; image: string; id: string } =
    useLocalSearchParams();
  console.log("old wallet: ", oldWallet);

  const onSubmit = async () => {
    let { name, image } = wallet;
    if (!name.trim() || !image) {
      Alert.alert("Usuario", "Por favor, completa todos los campos");
      return;
    }

    const data: WalletType = {
      name,
      image,
      uid: user?.uid,
    };
    setIsLoading(true);
    const res = await createOrUpdateWallet(data);
    setIsLoading(false);
    // console.log("result: ", res);
    if (res.success) {
      updateUserData(user?.uid as string);
      router.back();
    } else {
      Alert.alert("Usuario", res.msg);
    }
  };

  return (
    <ModalWrapper>
      <View style={styles.conatiner}>
        <Header
          title="Nueva Billetera"
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />
        {/* form */}
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Nombre de la Billetera</Typo>
            <Input
              placeholder="Salario"
              value={wallet.name}
              onChangeText={(value) => {
                setWallet({ ...wallet, name: value });
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Icono de la Billetera</Typo>
            <ImageUpload
              placeholder="Subir Icono"
              file={wallet.image}
              onClear={() => setWallet({ ...wallet, image: null })}
              onSelect={(file) => setWallet({ ...wallet, image: file })}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Button onPress={onSubmit} loading={isLoading} style={{ flex: 1 }}>
          <Typo color={colors.black} fontWeight={"700"}>
            Agregar Billetera
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default WalletModal;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
  },

  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },

  form: {
    gap: spacingX._30,
    marginTop: spacingY._15,
  },

  avatarContent: {
    position: "relative",
    alignSelf: "center",
  },

  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
  },

  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7,
  },

  inputContainer: {
    gap: spacingY._10,
  },
});
