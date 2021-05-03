import { FieldValue} from '../lib/firebase';
import firebase from "firebase/app"

export async function doesUsernameExist(username) {
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==' , username)
    .get();

    return result.docs.map((user) => user.data().length > 0)
}