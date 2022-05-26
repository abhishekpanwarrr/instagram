import {database} from './lib/firebase'

import { collection , addDoc } from "firebase/firestore";
export async function seedDatabase(app) {
  const collectionRef = collection(database,'usres')
  const collectionPhotoRef = collection(database,'photos')

    const users = [
      {
        userId: 'z2nDoEqeorep26Ul1bzqMQGLT1g2',
        username: 'karl',
        fullName: 'Karl Hadwen',
        emailAddress: 'karlhadwen@gmail.com',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'raphael',
        fullName: 'Raffaello Sanzio da Urbino',
        emailAddress: 'raphael@sanzio.com',
        following: [],
        followers: ['z2nDoEqeorep26Ul1bzqMQGLT1g2'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'dali',
        fullName: 'Salvador Dalí',
        emailAddress: 'salvador@dali.com',
        following: [],
        followers: ['z2nDoEqeorep26Ul1bzqMQGLT1g2'],
        dateCreated: Date.now()
      },
      {
        userId: '4',
        username: 'orwell',
        fullName: 'George Orwell',
        emailAddress: 'george@orwell.com',
        following: [],
        followers: ['z2nDoEqeorep26Ul1bzqMQGLT1g2'],
        dateCreated: Date.now()
      }
    ];
  
    // eslint-disable-next-line prefer-const
    for (let k = 0; k < users.length; k++) {
//       //  setDoc(doc(firebase, "users"), users[k])
//       // const newCityRef = addDoc(collection(app,'users'),users[k])
//         // collection(addDoc((app, "users"), users[k]))
//         const newCityRef = doc(collection(app, "users"));

// // later...
//       await setDoc(newCityRef, users[k])
//       // setDoc(newCityRef,users[k])
//       // firebase.firestore().collection('users').add(users[k]);
      addDoc(collectionRef,users[k])
    }
  
    // eslint-disable-next-line prefer-const


    for (let i = 1; i <= 5; ++i) {
      // firebase
      //   .firestore()
      //   .collection('photos')
      //   .add({
          // photoId: i,
          // userId: '2',
          // imageSrc: `/images/users/raphael/${i}.jpg`,
          // caption: 'Saint George and the Dragon',
          // likes: [],
          // comments: [
          //   {
          //     displayName: 'dali',
          //     comment: 'Love this place, looks like my animal farm!'
          //   },
          //   {
          //     displayName: 'orwell',
          //     comment: 'Would you mind if I used this picture?'
          //   }
          // ],
          // userLatitude: '40.7128°',
          // userLongitude: '74.0060°',
          // dateCreated: Date.now()
      //   });
      addDoc(collectionPhotoRef,{
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Love this place, looks like my animal farm!'
          },
          {
            displayName: 'orwell',
            comment: 'Would you mind if I used this picture?'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      })
    }
  }