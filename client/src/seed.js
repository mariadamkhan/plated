export function seedDatabase(firebase) {
  const users = [
    {
      userId: "svrnQvl77kbQyLsRXjVuAz5rkYi1",
      username: "mari",
      fullName: "Mari Adamkhan",
      emailAddress: "madamkhan@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "hannah",
      fullName: "Hannah Barbara",
      emailAddress: "hbarbara@gmail.com",
      following: [],
      followers: ["svrnQvl77kbQyLsRXjVuAz5rkYi1"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "felicia",
      fullName: "Felicia Polyzos",
      emailAddress: "fpolyzos@gmail.com",
      following: [],
      followers: ["svrnQvl77kbQyLsRXjVuAz5rkYi1"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "larisa",
      fullName: "Larisa Polukarova",
      emailAddress: "lpolukarova@gmail.com",
      following: [],
      followers: ["svrnQvl77kbQyLsRXjVuAz5rkYi1"],
      dateCreated: Date.now(),
    },
  ];

  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection("users").add(users[k]);
  }
}
