import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, database } from "@shared/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { child, get, ref, update } from "firebase/database";
import { generateRandomString } from "@shared/random-string";
import { trackIdentify } from "@shared/track";

interface AuthContext {
  currentUser: UserState;
  signInWithGoogle: () => void;
}

type UserState =
  | { status: "authenticated"; data: User }
  | { status: "loading" }
  | { status: "not-authenticated" };

interface User {
  uid: string;
  displayName: string;
  photoURL: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserState>({
    status: "loading",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, photoURL } = user;

        setCurrentUser({
          status: "authenticated",
          data: {
            uid: uid || "",
            displayName: displayName || "",
            photoURL: photoURL || "",
          },
        });
      } else {
        setCurrentUser({
          status: "not-authenticated",
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth.currentUser]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      const questionRef = ref(database);

      const snapshot = await get(
        child(questionRef, `moods/${result.user.uid}`)
      );

      trackIdentify(result.user.email || result.user.uid);

      if (!snapshot.exists()) {
        const user = {
          uid: result.user.uid,
          isActivated: true,
          createdAt: new Date().toISOString(),
        };

        const questionId = generateRandomString(10);

        await update(ref(database, `questions/${questionId}`), user);

        await update(ref(database, `moods/${result.user.uid}`), {
          questionId,
          createdAt: new Date().toISOString(),
        });
      }

      setCurrentUser({
        status: "authenticated",
        data: {
          displayName: result.user.displayName || "",
          photoURL: result.user.photoURL || "",
          uid: result.user.uid,
        },
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
