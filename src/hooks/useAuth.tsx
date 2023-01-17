import { getAuth } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { database } from "@/services/firebase";
import { child, get, ref } from "@firebase/database";
import User from "@/utils/user";

interface AuthContext {
  user: any;
  signInWithGoogle: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContext);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = getAuth();

  const [user, updateUser] = useReducer(
    (prev: any, next: any) => {
      if (auth.currentUser) {
        next.status = "authenticated";
        next.user = auth.currentUser;
      }

      return { ...prev, ...next };
    },
    {
      user: {
        uid: "",
        displayName: "",
        photoURL: "",
      },
      status: "unauthenticated",
    }
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, photoURL } = user;

        updateUser({
          user: {
            uid,
            displayName,
            photoURL,
          },
          status: "authenticated",
        });

        return;
      }
      updateUser({ status: "unauthenticated" });
    });

    return () => {
      unsubscribe();
    };
  }, [auth, user]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const questionRef = ref(database);

    const snapshot = await get(child(questionRef, `moods/${result.user.uid}`));

    if (!snapshot.exists()) {
      const user = new User(result.user.uid);

      const userData = {
        uid: result.user.uid,
        isActivated: true,
        createdAt: new Date().toISOString(),
      };

      await user.create(userData);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
