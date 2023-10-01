const swDev = () => {
  const swUrl = `${process.env.ROOT}/serviceWorker.js`;

  navigator.serviceWorker.register(swUrl).then((response) => {
    console.warn('response', response);
  });
};

export default swDev;
