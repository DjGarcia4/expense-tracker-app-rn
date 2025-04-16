import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Button from "@/components/Button";
import Animated, { FadeIn, FadeInDown, ZoomIn } from "react-native-reanimated";
import { useRouter } from "expo-router";

const Welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* login button and image */}
        <View>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Typo fontWeight={"500"} style={styles.loginButton}>
              Iniciar Sesión
            </Typo>
          </TouchableOpacity>
          <Animated.Image
            entering={ZoomIn.duration(1000).springify().damping(12)}
            source={require("../../assets/images/welcome.png")}
            style={styles.welcomImage}
            resizeMode="contain"
          />
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(100)
              .springify()
              .damping(12)}
            style={{ alignItems: "center" }}
          >
            <Typo size={30} fontWeight={"800"}>
              Siempre toma el control
            </Typo>
            <Typo size={30} fontWeight={"800"}>
              de tus finanzas
            </Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(100)
              .springify()
              .damping(12)}
            style={{ alignItems: "center", gap: 2 }}
          >
            <Typo size={17} color={colors.textLight}>
              Las finanzas deben organizarse para lograr un
            </Typo>
            <Typo size={17} color={colors.textLight}>
              mejor estilo de vida en el futuro
            </Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(200)
              .springify()
              .damping(12)}
            style={styles.buttonContainer}
          >
            <Button onPress={() => router.push("/(auth)/register")}>
              <Typo size={22} color={colors.neutral900} fontWeight={"600"}>
                Empezar
              </Typo>
            </Button>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._7,
  },
  welcomImage: {
    width: "100%",
    height: verticalScale(300),
    alignSelf: "center",
    marginTop: verticalScale(100),
  },
  loginButton: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    shadowColor: "white",
    shadowOffset: { width: 0, height: -10 },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
