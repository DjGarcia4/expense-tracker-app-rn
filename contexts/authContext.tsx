import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType>(null);
  const router = useRouter();
  const firebaseErrors: Record<string, string> = {
    "auth/invalid-email": "El correo electrónico no es válido.",
    "auth/user-disabled": "Esta cuenta ha sido deshabilitada.",
    "auth/user-not-found": "No existe una cuenta con este correo.",
    "auth/wrong-password": "La contraseña es incorrecta.",
    "auth/email-already-in-use": "Este correo ya está registrado.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
    "auth/missing-password": "Por favor, ingresa una contraseña.",
    "auth/too-many-requests":
      "Demasiados intentos fallidos. Intenta más tarde.",
    "auth/network-request-failed": "Error de conexión. Verifica tu internet.",
    "auth/invalid-credential": "Credenciales inválidas. Revisa tus datos.",
    "auth/missing-email": "Por favor, ingresa un correo electrónico.",
    "auth/internal-error": "Ocurrió un error inesperado. Intenta nuevamente.",

    "auth/operation-not-allowed":
      "El registro con email y contraseña no está habilitado.",
  };
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser?.uid,
          email: firebaseUser?.email,
          name: firebaseUser?.displayName,
        });
        updateUserData(firebaseUser.uid);
        router.replace("/(tabs)");
      } else {
        setUser(null);
        router.replace("/(auth)/welcome");
      }
    });
    return () => unsub();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      const code = error.code || "auth/internal-error";
      const msg =
        firebaseErrors[code] ||
        "Ocurrió un error inesperado. Intenta de nuevo.";
      return { success: false, msg };
    }
  };
  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(firestore, "users", response.user.uid), {
        name,
        email,
        uid: response.user.uid,
      });
      return { success: true };
    } catch (error: any) {
      const code = error.code || "auth/internal-error";
      const msg =
        firebaseErrors[code] ||
        "Ocurrió un error al crear la cuenta. Intenta nuevamente.";
      return { success: false, msg };
    }
  };

  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data?.uid,
          email: data?.email || null,
          name: data?.name || null,
          image: data?.image || null,
        };

        setUser({ ...userData });
      }
    } catch (error: any) {
      let msg = error.message;
      console.log("error: ", msg);
    }
  };
  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be warpped inside AuthProvider");
  }
  return context;
};
