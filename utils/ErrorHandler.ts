const handler = (err: any) => {
  let message: string = err.message;

  console.log(err);

  if (err.code === 11000)
    message = `${Object.keys(
      err.keyValue
    )} already exist please try a new one.`;

  if (err.code === 121) {
    message = `please try again`;
  }

  return message;
};

export default handler;
