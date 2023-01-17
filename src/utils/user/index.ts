import { UserInterface } from "@/utils/user/models/user.interface";
import { uuidv4 } from "@firebase/util";
import { get, ref, update } from "@firebase/database";
import { database } from "@/services/firebase";

class User {
  private readonly uid: string;
  constructor(uid: string) {
    this.uid = uid;
  }

  public create = async (data: UserInterface) => {
    const questionId = uuidv4();

    await update(ref(database, `questions/${questionId}`), data);

    await update(ref(database, `moods/${this.uid}`), {
      questionId,
      createdAt: new Date().toISOString(),
    });
  };

  public getUser = async () => {
    const snapshot = await get(ref(database, `moods/${this.uid}`));
    return snapshot.val();
  };
}

export default User;
