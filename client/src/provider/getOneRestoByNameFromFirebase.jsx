import { fireDB } from "../lib/firebase";
import { kebabCase } from "lodash";

export function getOneRestoByNameFromFirebase(restoNameKebab, resolve) {
  fireDB
    .collection("restaurants")
    .get()
    // looking at ALL restuarants...
    .then((docs) => {
      docs.forEach((doc) => {
        if (!doc.exists) {
          console.error("doc doesn't exist!");
        }
        const data = doc.data();
        console.log(
          "🚀 ~ file: FirebaseProvider.jsx ~ line 133 ~ docs.forEach ~ data",
          data
        );
        // get me the one that...?
        const isTheOneWeWant = kebabCase(data.restoName) === restoNameKebab;
        console.log(
          "🚀🚀🚀🚀🚀🚀🚀 ~ file: FirebaseProvider.jsx ~ line 135 ~ docs.forEach ~ isTheOneWeWant",
          isTheOneWeWant
        );
        // we found it!
        if (isTheOneWeWant) {
          // give it back to the caller
          resolve(data);
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
}
