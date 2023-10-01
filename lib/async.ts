// delat the loading so we can see the different elements pop in when they load

export const delay = (time) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(1), time);
  });
