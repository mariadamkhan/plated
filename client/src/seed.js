
export function seedDatabase(firebase) {
    const users = [
      {
        userId: 'svrnQvl77kbQyLsRXjVuAz5rkYi1',
        username: 'mari',
        fullName: 'Mari Adamkhan',
        emailAddress: 'madamkhan@gmail.com',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'hannah',
        fullName: 'Hannah Barbara',
        emailAddress: 'hbarbara@gmail.com',
        following: [],
        followers: ['svrnQvl77kbQyLsRXjVuAz5rkYi1'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'felicia',
        fullName: 'Felicia Polyzos',
        emailAddress: 'fpolyzos@gmail.com',
        following: [],
        followers: ['svrnQvl77kbQyLsRXjVuAz5rkYi1'],
        dateCreated: Date.now()
      },
      {
        userId: '4',
        username: 'larisa',
        fullName: 'Larisa Polukarova',
        emailAddress: 'lpolukarova@gmail.com',
        following: [],
        followers: ['svrnQvl77kbQyLsRXjVuAz5rkYi1'],
        dateCreated: Date.now()
      }
    ];
  
    // eslint-disable-next-line prefer-const
    for (let k = 0; k < users.length; k++) {
      firebase.firestore().collection('users').add(users[k]);
    }

    //      firebase
    //     .firestore()
    //     .collection('restaurants')
    //     .add({
    //       name: Le Diplomate
    //       address: Address: 129 Rue Beaubien O, Montréal QC H2V 1C3, Canada,
    //       phone:(514) 303-9727
    //       photoId: '1234',
    //       userId: 'svrnQvl77kbQyLsRXjVuAz5rkYi1',
    //       imageSrc: `/images/`,
    //       dateCreated: Date.now()
    //       url: resto website url
    //       urlReso: open table reso link
    //       likes: [],
    //       notes: [
    //         {
    //           note: 'Love this place, their french onion soup is a must'
    //         },
    //         {
    //           note: 'The booths in back allow for an incredible panoramic view of the city scape. '
    //         }
    //       ],

    //     });
  

  }