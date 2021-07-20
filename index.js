console.log("Hello Guvi");

// crt+`

const users = [
  {
    createdAt: "2021-07-18T14:27:42.798Z",
    name: "Sherman Murray PhD",
    avatar: "https://cdn.fakercloud.com/avatars/vikashpathak18_128.jpg",
    id: "1",
  },
  {
    createdAt: "2021-07-18T13:50:51.827Z",
    name: "Jenna Hansen",
    avatar: "https://cdn.fakercloud.com/avatars/mkginfo_128.jpg",
    id: "2",
  },
  {
    createdAt: "2021-07-18T10:50:42.441Z",
    name: "Glen Mante",
    avatar: "https://cdn.fakercloud.com/avatars/leandrovaranda_128.jpg",
    id: "3",
  },
  {
    createdAt: "2021-07-19T01:49:10.965Z",
    name: "Stuart Waelchi",
    avatar: "https://cdn.fakercloud.com/avatars/zauerkraut_128.jpg",
    id: "4",
  },
  {
    createdAt: "2021-07-18T16:10:36.915Z",
    name: "Wilbur Ward",
    avatar: "https://cdn.fakercloud.com/avatars/plbabin_128.jpg",
    id: "5",
  },
  {
    createdAt: "2021-07-18T19:50:17.348Z",
    name: "Katie Lynch",
    avatar: "https://cdn.fakercloud.com/avatars/justinrob_128.jpg",
    id: "6",
  },
  {
    createdAt: "2021-07-18T10:48:25.411Z",
    name: "Devin Fay",
    avatar: "https://cdn.fakercloud.com/avatars/rodnylobos_128.jpg",
    id: "7",
  },
  {
    createdAt: "2021-07-18T18:24:58.961Z",
    name: "Peggy Heaney",
    avatar: "https://cdn.fakercloud.com/avatars/kaysix_dizzy_128.jpg",
    id: "8",
  },
  {
    createdAt: "2021-07-18T20:14:42.063Z",
    name: "Emily Mann PhD",
    avatar: "https://cdn.fakercloud.com/avatars/marcobarbosa_128.jpg",
    id: "9",
  },
  {
    createdAt: "2021-07-19T02:03:58.515Z",
    name: "Roman Cartwright",
    avatar: "https://cdn.fakercloud.com/avatars/imcoding_128.jpg",
    id: "10",
  },
];

const args = process.argv;

const keyName = args[2];

console.log(users.map((user) => user[keyName]));

// const idx = 2;
// num[idx]

// console.log(document, window);
// console.log(globalThis);

console.log(args);
console.log("first argument ", args[0]);
console.log("second argument ", args[1]);
console.log("third argument ", args[2]);

// dot syntax
// user.name

// box syntax
// user['name']
