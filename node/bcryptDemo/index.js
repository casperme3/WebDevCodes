const bcrypt = require('bcrypt');

const hashPw = async (pw) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw, salt);

    console.log(salt);
    console.log(hash)
}

const login = async (txt, hashed) => {
    const result = await bcrypt.compare(txt, hashed);

    if (result) {
        console.log('Good! You are logged in!');
    } else {
        console.log('Sorry wrong password.')
    }
}

// hashPw('mommy');
login('mommy', '$2b$12$hGoFSGSbcN4f.cJsiR/BWeGsv7wirMG3orEi5uxKxSrP.BlqX2e1m');
login('mommy', '$2b$12$hGoFSGSbcN4f.cJsiR/BWeGsv7wirMG3orEi5uxKxSrP.BlqX2e1m');
login('mommy', '$2b$12$6FM/HN6A0BOsMkruil5DQeGsv7wirMG3orEi5uxKxSrP.BlqX2e1m');
