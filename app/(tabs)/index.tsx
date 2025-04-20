import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useAuth } from "@/contexts/authContext";
import ScreenWrapper from "@/components/ScreenWrapper";

const Home = () => {
  const { user, showLogOutAlert } = useAuth();
  console.log(user);

  return (
    <ScreenWrapper>
      <Typo>Home</Typo>
      {/* <Button onPress={() => showLogOutAlert()}>
        <Typo>Logout</Typo>
      </Button> */}
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
