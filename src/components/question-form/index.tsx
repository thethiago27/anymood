import { Container, Form, Title, Warning } from "./styles";
import { useRouter } from "next/router";
import { getTranslation } from "@/services/translate";
import { FormEvent, useReducer } from "react";
import { toast } from "react-toastify";
import { child, push, ref, update } from "@firebase/database";
import { database } from "@/services/firebase";

type QuestionProps = {
  data: {
    uid: string;
    isActivated: boolean;
    createdAt: number;
  };
};
const QuestionForm = ({ data }: QuestionProps) => {
  const router = useRouter();

  const { locale } = router;
  const t = getTranslation(String(locale));

  const [answer, updateAnswer] = useReducer(
    (prev: any, next: any) => {
      next.isError = next.value.length > 120;

      return { ...prev, ...next };
    },
    {
      value: "",
      isError: false,
    }
  );
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!answer.value) return toast.error(t.emptyQuestionError);

    try {
      const newAnswerKey = push(
        child(ref(database), `moods/${data.uid}/answers`)
      ).key;

      const updates: any = {};

      updates[`/moods/${data.uid}/answers/${newAnswerKey}`] = {
        id: newAnswerKey,
        answer: answer.value,
        createdAt: new Date().toISOString(),
      };

      toast.success(t.questionSent);

      await update(ref(database), updates);
      await router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container data-testid="question-form">
      <Title>{t.questionText}</Title>
      <Form isError={answer.isError} onSubmit={handleSubmit}>
        <label>
          <textarea
            value={answer.value}
            onChange={(e) => updateAnswer({ value: e.target.value })}
          />
          <p className="counter">{answer.value.length}/120</p>
        </label>
        <Warning>{t.warning}</Warning>
        <button type="submit" disabled={answer.isError}>
          {t.questionButton}
        </button>
      </Form>
    </Container>
  );
};

export default QuestionForm;
