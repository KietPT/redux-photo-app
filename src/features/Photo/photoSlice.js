import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import photoApi from 'api/photoApi';

export const getPhotoList = createAsyncThunk('photos/getPhotos', async (params, thunkAPI) => {
  // thunkAPI.dispatch(...)
  const photoList = await photoApi.getAll();
  return photoList;
});

export const getPhotoById = createAsyncThunk('photos/getPhotoById', async (id, thunkAPI) => {
  // thunkAPI.dispatch(...)
  const photo = await photoApi.getPhoto(id);
  return photo;
});

const photo = createSlice({
  name: 'photos',
  initialState: [],
  reducers: {
    addPhoto: (state, action) => {
      // state.push(action.payload);
    },
    removePhoto: (state, action) => {
      // const removePhotoId = action.payload;
      // return state.filter(photo => photo.id !== removePhotoId);
    },
    updatePhoto: (state, action) => {
      // const newPhoto = action.payload;
      // const photoIndex = state.findIndex(photo => photo.id === newPhoto.id);

      // if (photoIndex >= 0) {
      //   state[photoIndex] = newPhoto;
      // }
    }
  },
  extraReducers: {
    [getPhotoList.fulfilled]: (state, action) => {
      state = action.payload;
      return state
    },
    [getPhotoById.fulfilled]: (state, action) => {
      return action.payload
    }
  }
});

const { reducer: photoReducer, actions } = photo;
export const { addPhoto, removePhoto, updatePhoto } = actions;
export default photoReducer;