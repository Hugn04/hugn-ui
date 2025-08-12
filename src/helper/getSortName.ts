export const getSortName = (name: string) => {
  const sortName = name
    .split(" ")
    .slice(0, 2)
    .map((item) => {
      return item[0];
    });

  return sortName.join("").toUpperCase();
};
