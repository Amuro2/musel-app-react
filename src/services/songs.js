import { api } from "./api";
import * as tags from "./tags";

export const songApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSongs: builder.query({
      query: () => "/song/all",
      providesTags: [tags.songs],
    }),

    getSongById: builder.query({
      query: (id) => "/song/" + id,
      providesTags: [tags.songs],
    }),

    getSongByIdTagless: builder.query({
      query: (id) => "/song/" + id,
    }),

    postSong: builder.mutation({
      query: ({
        title,
        loopStart,
        loopEnd,
        fileDuration,
        file,
      }) => {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("loopStart", loopStart);
        formData.append("loopEnd", loopEnd);
        formData.append("fileDuration", fileDuration);
        formData.append("file", file);

        return ({
          url: "/song",
          method: "POST",
          body: formData,
        });
      },
      invalidatesTags: [tags.songs],
    }),

    putSong: builder.mutation({
      query: ({
        id,
        title,
        loopStart,
        loopEnd,
        fileDuration,
        file,
      }) => {
        const formData = new FormData();

        formData.append("id", id);
        formData.append("title", title);
        formData.append("loopStart", loopStart);
        formData.append("loopEnd", loopEnd);
        formData.append("fileDuration", fileDuration);
        formData.append("file", file);

        return ({
          url: "/song",
          method: "PUT",
          body: formData,
        });
      },
      invalidatesTags: [tags.songs],
    }),

    deleteSong: builder.mutation({
      query: (id) => {
        return ({
          url: "/song/" + id,
          method: "DELETE",
        });
      },
      invalidatesTags: [tags.songs],
    }),

    downloadSongFile: builder.query({
      query: id => ({
        url: "/song/file/" + id,
        responseHandler: (response) => {
          return response.arrayBuffer();
        },
      }),
    }),
  }),
});

export const {
  useGetAllSongsQuery,
  useGetSongByIdQuery,
  useGetSongByIdTaglessQuery,
  usePostSongMutation,
  usePutSongMutation,
  useDeleteSongMutation,
  useDownloadSongFileQuery,
} = songApi;
