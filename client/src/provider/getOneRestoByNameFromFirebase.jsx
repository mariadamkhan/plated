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
        // get me the one that...?
        const isTheOneWeWant = kebabCase(data.restoName) === restoNameKebab;
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
