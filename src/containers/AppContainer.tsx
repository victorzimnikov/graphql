import React from "react";
import { createClient, Provider } from "urql";

import { SendForm } from "../components/SendForm";

export const client = createClient({
  url: "http://152.228.215.94:83/api",
});

export function AppContainer() {
  return (
    <Provider value={client}>
      <SendForm
        onSubmit={(values) =>
          new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
            // eslint-disable-next-line no-console
            console.log(values);
          })
        }
        initialValues={{
          name: "",
          positions: [],
          relation: null,
          description: "",
        }}
      />
    </Provider>
  );
}
