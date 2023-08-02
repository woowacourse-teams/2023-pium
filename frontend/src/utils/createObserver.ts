const createObserver = (onIntersecting: () => void) =>
  new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) onIntersecting();
      });
    },
    {
      rootMargin: '0px 0px 500px 0px',
    }
  );

export default createObserver;
