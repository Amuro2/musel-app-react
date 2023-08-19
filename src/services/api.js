import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import * as tags from "./tags";

const API_ENDPOINT = "http://localhost:8080/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINT,
    prepareHeaders: (headers) => {
      // headers.set("Accept", "application/ld+json");
      return headers;
    },
  }),
  tagTypes: Object.values(tags),
  endpoints: () => ({}),
});
