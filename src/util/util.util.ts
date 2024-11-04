export const timeout = (delay = 0) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
