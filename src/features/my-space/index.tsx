import Layout from "@shared/layout";
import { useNavigate } from "react-router-dom";
import styles from "@features/my-space/styles.module.scss";
import AnswerBox from "@features/my-space/items/answer-box";
import { useEffect, useState } from "react";
import {
  AnswersError,
  AnswersType,
  AsyncAnswers,
} from "@features/my-space/models/answer";
import { useAuth } from "../../context/useAuth";
import { off, onValue, ref } from "firebase/database";
import { database } from "@shared/firebase";

import {
  AsyncPersonalData,
  PersonalDataType,
} from "@features/my-space/models/personal";
import { track, trackIncrement, useTrack } from "@shared/track";

const MySpace = () => {
  useTrack("User viewed my space page");

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [asyncAnswers, setAsyncAnswers] = useState<
    AsyncAnswers<AnswersType[], AnswersError>
  >({
    status: "loading",
  });

  const [userPersonalInfo, setUserPersonalInfo] = useState<
    AsyncPersonalData<PersonalDataType>
  >({
    status: "loading",
  });

  useEffect(() => {
    if (currentUser.status === "loading") return;

    if (currentUser.status === "not-authenticated") {
      track("User tried to access my-space without being authenticated");
      navigate("/register");
    }

    if (currentUser.status === "authenticated") {
      const answersRef = ref(database, `moods/${currentUser.data.uid}`);

      onValue(answersRef, (snapshot) => {
        const data = snapshot.val();

        setUserPersonalInfo({
          status: "loaded",
          data: {
            questionId: data.questionId,
          },
        });

        if (!data.answers) {
          setAsyncAnswers({
            status: "loaded",
            data: [],
          });
          return;
        }

        const answers = Object.entries(data.answers).map(
          ([key, value]: any) => ({
            ...value,
            id: key,
          })
        );

        setAsyncAnswers({
          status: "loaded",
          data: answers,
        });
      });

      return () => {
        off(answersRef);
      };
    }
  }, [currentUser]);

  const handleCopy = async (e: string) => {
    track("User copied link");
    trackIncrement("user-copied-link");
    await navigator.clipboard.writeText(e);
  };

  return (
    <Layout>
      {currentUser.status === "authenticated" && (
        <div className={styles.header}>
          <div className={styles.user}>
            <img src={currentUser.data.photoURL} alt="User" />
            <p>Olá, {currentUser.data.displayName}</p>
          </div>
          {userPersonalInfo.status === "loaded" && (
            <>
              <div
                className={styles.link}
                onClick={() =>
                  handleCopy(
                    `https://anymood.vercel.app/question/${userPersonalInfo.data.questionId}`
                  )
                }
              >
                <p>
                  https://anymood.vercel.app/question/
                  {userPersonalInfo.data.questionId}
                </p>
              </div>
              <p>Clique para copiar o link da sua página</p>
            </>
          )}
        </div>
      )}
      <div className={styles.container}>
        <h1>Respostas</h1>
        {asyncAnswers.status === "loaded" && (
          <>
            <p>Você teve um total de {asyncAnswers.data.length} respostas!</p>
            <div className={styles.answers}>
              {asyncAnswers.data.map((answer) => (
                <AnswerBox answer={answer} key={answer.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default MySpace;
