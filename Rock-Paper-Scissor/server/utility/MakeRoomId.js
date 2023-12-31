module.exports = () => {
  let id = 0;
  for (let i = 1; i < 7; i++) {
    const digit = Math.floor(Math.random() * 9 + 1);
    id = id * 10 + digit;
  }
  return id;
};
