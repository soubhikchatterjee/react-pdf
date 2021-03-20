import en from "../locales/en.json";
import fr from "../locales/fr.json";

const Translate = ({ id, values = [], uppercase = false, locale = "en" }) => {
  const transformVariables = (response) => {
    const re = /(\{{[0-9]+\}})/g;
    const matches = response.matchAll(re);

    if (matches && !values.length) {
      let counter = 0;
      for (const match of matches) {
        response = response.replace(match[0], values[counter]);
        counter++;
      }
    }
    return response;
  };

  let response;
  switch (locale) {
    case "en":
    default:
      response = en[id];
      break;
    case "fr":
      response = fr[id];
      break;
  }

  response = response || "";
  response = transformVariables(response);
  if (uppercase) {
    response = response.toUpperCase();
  }
  return response;
};

export default Translate;
