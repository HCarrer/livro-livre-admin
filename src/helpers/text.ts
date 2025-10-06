export const upperCaseFirstLetter = (str?: string) => {
  if (!str) return "";
  return str
    .toLocaleLowerCase("pt-BR")
    .replace(/(^|\s)\S/g, (char) => char.toLocaleUpperCase("pt-BR"));
};
