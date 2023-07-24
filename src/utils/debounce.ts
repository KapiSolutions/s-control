const debounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
  let timer: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<F>) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

export default debounce;
