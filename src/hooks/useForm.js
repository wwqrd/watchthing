import { useState } from "react";
import debug from "debug";

const log = debug("watchthing:form");
log.set = debug("watchthing:form:set");

const useForm = (initialValues) => {
  const [values, setValue] = useState(initialValues);

  const inputHandler = (e) => {
    const target = e.target;
    if (!target) {
      return;
    }
    const name = target.getAttribute("name");
    const type = target.getAttribute("type");
    const value = type === "number" ? parseInt(target.value) : target.value;

    log.set(`${name}[${type}] = "${value}"`);

    setValue((prev) => ({ ...prev, [name]: value }));
  };

  return [values, setValue, inputHandler];
};

export default useForm;
