export const start = (Class: any) => {
  const application = Reflect.getMetadata('application', Class);
  application.start();
};
