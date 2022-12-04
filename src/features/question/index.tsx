import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { database } from "@shared/firebase";
import { ref, push, child, update, get } from "firebase/database";
import Layout from "@shared/layout";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import {
  AsyncQuestion,
  QuestionError,
  QuestionType,
} from "@features/question/models/question";
import { useNavigate } from "react-router-dom";
import { track, trackIncrement, useTrack } from "@shared/track";

type QuestionValues = {
  answer: string;
};

const Question = () => {
  useTrack("User viewed question page");

  const { id } = useParams();
  const { handleSubmit, register } = useForm<QuestionValues>();

  const [answerCount, setAnswerCount] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const [asyncQuestion, setAsyncQuestion] = useState<
    AsyncQuestion<QuestionType, QuestionError>
  >({ status: "loading" });

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const questionRef = ref(database);
        const snapshot = await get(child(questionRef, `questions/${id}`));

        if (snapshot.exists()) {
          setAsyncQuestion({ status: "loaded", data: snapshot.val() });
          track("User viewed question", {
            questionId: id,
          });
        } else {
          track("Error#QuestionNotFound", { questionId: id });
          setAsyncQuestion({
            status: "error",
            error: {
              message: "Essa pergunta não existe! Ou foi excluída.",
            },
          });
        }
      } catch (e) {
        track("Error#QuestionNotFound", {
          questionId: id,
          error: e,
        });
        setAsyncQuestion({
          status: "error",
          error: {
            message: "Ocorreu um erro ao carregar a pergunta!" + e,
          },
        });
      }
    })();
  }, []);

  const saveQuestion: SubmitHandler<QuestionValues> = async (data) => {
    if (asyncQuestion.status === "loaded") {
      setIsAnswered(true);
      const newAnswerKey = push(
        child(ref(database), `moods/${asyncQuestion.data.uid}/answers`)
      ).key;

      const updates: any = {};

      updates[`/moods/${asyncQuestion.data.uid}/answers/${newAnswerKey}`] = {
        id: newAnswerKey,
        answer: data.answer,
        createdAt: new Date().toISOString(),
      };

      await update(ref(database), updates);

      track("User answered question", {
        questionId: id,
      });

      trackIncrement("user-answered-question");

      navigate("/register");
    }
  };

  return (
    <Layout>
      {asyncQuestion.status === "loading" && <p>Carregando...</p>}
      {asyncQuestion.status === "error" && <p>{asyncQuestion.error.message}</p>}
      {asyncQuestion.status === "loaded" && (
        <div className={styles.container}>
          <p className={styles.question}>
            Fale algo para mim, que sempre quis dizer...
          </p>
          <form onSubmit={handleSubmit(saveQuestion)} className={styles.form}>
            <textarea
              className={styles.textarea}
              {...register("answer", {
                required: true,
                maxLength: 50,
                onChange: (e) => {
                  setAnswerCount(e.target.value.length);
                },
              })}
            />
            <div className={`${answerCount > 50 && styles.maxCharacters}`}>
              {answerCount}/50
            </div>
            <p className={styles.warning}>
              Lembre-se: A sua resposta é anônima!
            </p>

            <button className={styles.button}>
              {isAnswered ? "Respondendo..." : "Responder"}
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default Question;
