import styles from "./styles.module.scss";
import logo from "./assets/background.svg";
import download from "./assets/download.svg";
import { track, trackIncrement } from "@shared/track";

interface AnswerBoxProps {
  answer: AnswerType;
}

type AnswerType = {
  answer: string;
};

const AnswerBox = ({ answer }: AnswerBoxProps) => {
  const saveAnswerAsImage = async () => {
    const canvas = document.createElement("canvas");
    const ctx: any = canvas.getContext("2d");

    canvas.width = 430;
    canvas.height = 171;

    const img = new Image();
    img.src = logo;
    img.onload = async () => {
      ctx.drawImage(img, 0, 0);
      ctx.font = "20px Poppins";
      ctx.fillStyle = "black";

      // Insert break lines

      const text = answer.answer;

      const words = text.split(" ");
      let line = "";
      let lines = [];
      let y = 50;
      let lineHeight = 40;

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        // If the text is too long, insert a break line
        if (testWidth > canvas.width - 20 && i > 0) {
          lines.push(line);
          line = word + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }

        if (i === words.length - 1) {
          lines.push(line);
        }

        // Draw the text

        lines.forEach((line, index) => {
          ctx.fillText(line, 20, 100 + index * lineHeight);
        });
      }

      try {
        // Download the image

        const dataURL = canvas.toDataURL("image/png");
        const blob = await fetch(dataURL).then((r) => r.blob());
        const file = new File([blob], "answer.png", { type: "image/png" });

        await navigator.share({
          title: "Confira essa resposta no meu AnyMood!",
          text: answer.answer,
          files: [file],
        });
      } catch (e: any) {
        alert(e.message);
      }
    };
  };

  return (
    <div
      onClick={() => {
        track("User clicked in share button");
        trackIncrement("user-clicked-in-share-button");
        saveAnswerAsImage();
      }}
      className={styles.box}
    >
      <p>{answer.answer}</p>
      <div className={styles.downloads}>
        <img src={download} alt="Download" className={styles.downloadIcon} />
      </div>
    </div>
  );
};

export default AnswerBox;
