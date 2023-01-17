import { GetServerSideProps } from "next";
import { child, get, ref } from "@firebase/database";
import { database } from "@/services/firebase";
import Layout from "@/components/layout";
import dynamic from "next/dynamic";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.params;

  const questionRef = ref(database);
  const snapshot = await get(child(questionRef, `questions/${id}`));

  return {
    props: {
      data: snapshot.val(),
    },
  };
};

type QuestionProps = {
  data: {
    uid: string;
    isActivated: boolean;
    createdAt: number;
  };
};

const QuestionForm = dynamic(() => import("../../components/question-form"), {
  ssr: false,
});

const QuestionDontFound = dynamic(
  () => import("../../components/question-dont-found"),
  {
    ssr: false,
  }
);

const Question = ({ data }: QuestionProps) => {
  return (
    <Layout>
      {data ? <QuestionForm data={data} /> : <QuestionDontFound />}
    </Layout>
  );
};

export default Question;
