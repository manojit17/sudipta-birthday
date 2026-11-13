// ✨ EDIT EVERYTHING HERE — names, passcode, photos, messages ✨
export const config = {
  name: 'Kocho',
  passcode: '2007', // 4 digits
  passcodeHint: 'Hint: a date we both love 💕',
  wrongMessage: "Oops, that's not it, cutie 🙈 Try again!",
  // Put an mp3 in /public/music and set e.g. '/music/song.mp3'. Empty = built-in music-box lullaby.
  musicSrc: '/music/happyb.mp4',

  intro: { heading: 'Someone Special Has Sent You Something...', button: 'Open Your Surprise' },
  passcodeScreen: { title: 'Secret Passcode', sub: 'Enter the 4 magic digits' },
  balloons: { instruction: 'Pop All 4 Balloons', done: 'You Are So Special ❤️',
    colors: ['#ff8fb8', '#cdb4ff', '#a2d2ff', '#ffd6a5'] },
  wish: { title: 'Blow the Candle, {name}', sub: 'Close your eyes & make a wish.', done: 'Your wish is on its way ✨' },

  memories: {
    title: 'Sweet Memories',
    // Drop images in /public/photos and list them here. Add as many as you like.
    photos: [
      { src: '/photos/1.jpeg', caption: 'The day I knew',  },
      { src: '/photos/4.jpeg', caption: 'Our favourite place',  },
      { src: '/photos/3.jpeg', caption: 'Smiling for no reason',  },
      { src: '/photos/2.jpeg', caption: 'Still my favourite',  },
      { src: '/photos/5.jpeg', caption: 'Your Favourite',  },
  
    ],
  },

  wall: {
    title: 'Our Little Wall',
    sub: 'tap a photo to see it closer',
    // Photos hang on the ropes, 2 per rope. Add as many as you like.
    photos: [
      { src: '/photos/Extra.jpeg', caption: 'Sundori😘' },
      { src: '/photos/two.jpeg', caption: 'Kocho😍' },
      { src: '/photos/three.jpeg', caption: 'Angry Bird😝' },
      { src: '/photos/four.jpeg', caption: 'Forever❤️' },
    ],
    // Cute notes stuck on the wall (shown between the ropes, in order)
    notes: ['You ❤️', 'Home is wherever you are', 'Made for each other ✨'],
    next: 'Next surprise',
  },

  letter: {
    title: 'A Message From My Heart',
    tap: 'Tap to open',
    greeting: 'My dearest {name},',
    paragraphs: [
      'শুভ জন্মদিন, আমার পুচকি! ❤️🥹.',
      'জানো, তোমার মতো একটা মিষ্টি মানুষ আমার জীবনে আছে, এটাই আমার কাছে অনেক বড় পাওয়া। তোমার ওই মিষ্টি হাসি, ছোট ছোট অভিমান আর তোমার ভালোবাসা—সবকিছুই আমার ভীষণ প্রিয়। তুমি পাশে থাকলে সাধারণ মুহূর্তগুলোও কত সুন্দর হয়ে ওঠে, সেটা হয়তো তোমাকে বলে বোঝাতে পারব না।',
      'আমি চাই, তোমার জীবনের প্রতিটা দিন হাসি, আনন্দ আর ভালোবাসায় ভরে উঠুক। তোমার মনের সব ছোট ছোট ইচ্ছেগুলো পূরণ হোক, আর তোমার চোখে কখনও জল না আসুক। সবসময় এভাবেই হাসিখুশি থেকো',
      'অনেক অনেক ভালোবাসি তোমায়। ❤️',
    ],
    signoff: 'Forever yours,',
    signature: 'Sudipta',
  },

  finale: {
    heading: 'One Last Thing...', sub: 'Tap the Gift',
    title: 'Happy Birthday, {name}! 🎂',
    message: 'You are loved more than you know. Here\'s to you, to us, and to every beautiful memory still waiting to happen. I love you. 💖',
    replay: 'Replay the surprise',
  },
};
export const fill = (s) => s.replaceAll('{name}', config.name);
