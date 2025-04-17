import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import BackButton from "@/components/BackButton";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import * as Icons from "phosphor-react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/authContext";

const Register = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("Registro", "Por favor, completa todos los campos");
      return;
    }
    setIsLoading(true);
    const res = await registerUser(
      emailRef.current,
      passwordRef.current,
      nameRef.current
    );
    setIsLoading(false);
    console.log("register result: ", res);
    if (!res.success) {
      Alert.alert("Registro", res.msg);
    }
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />
        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Vamos a
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Comenzar
          </Typo>
        </View>
        {/* Formulario */}
        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Crea una cuenta para llevar el control de tus gastos
          </Typo>
          <Input
            placeholder="Ingresa tu nombre"
            onChangeText={(value) => (nameRef.current = value)}
            icon={
              <Icons.User size={verticalScale(26)} color={colors.neutral300} />
            }
          />
          <Input
            placeholder="Ingresa tu correo electrónico"
            onChangeText={(value) => (emailRef.current = value)}
            icon={
              <Icons.At size={verticalScale(26)} color={colors.neutral300} />
            }
          />
          <Input
            placeholder="Ingresa tu contraseña"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
            icon={
              <Icons.Lock size={verticalScale(26)} color={colors.neutral300} />
            }
          />

          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight={"700"} color={colors.black} size={21}>
              Registrarse
            </Typo>
          </Button>
        </View>
        {/* Pie de página */}
        <View style={styles.footer}>
          <Typo size={15}>¿Ya tienes una cuenta?</Typo>
          <Pressable onPress={() => router.navigate("/(auth)/login")}>
            <Typo size={15} fontWeight={"700"} color={colors.primary}>
              Iniciar sesión
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
