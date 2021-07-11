/* eslint-disable react-hooks/exhaustive-deps */
import { unwrapResult } from '@reduxjs/toolkit';
import photoApi from 'api/photoApi';
import Banner from 'components/Banner';
import PhotoForm from 'features/Photo/components/PhotoForm';
import { addPhoto, getPhotoById, updatePhoto } from 'features/Photo/photoSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './styles.scss';

AddEditPage.propTypes = {};

function AddEditPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();
  const isAddMode = !photoId;
  const [editedPhoto, setEditedPhoto] = useState([]);
  useEffect(() => {
    const fetchEditedPhoto = async () => {
      try {
        const actionResult = await dispatch(getPhotoById(photoId));
        const editedPhoto = unwrapResult(actionResult);
        setEditedPhoto(editedPhoto);
      } catch (error) {
        console.log('Failed to fetch photo: ', error);
      }
    }
    if(!isAddMode) fetchEditedPhoto();
  }, []);

  const initialValues = isAddMode
    ? {
      title: '',
      categoryId: null,
      photo: '',
    }
    : editedPhoto;

  const handleSubmit = (values) => {
    return new Promise(resolve => {
      setTimeout(async () => {
        if (isAddMode) {
          const newPhoto = {
            ...values,
            id: uuidv4(),
          }
          await photoApi.addPhoto(newPhoto)
          const action = addPhoto(newPhoto);
          dispatch(action);
        } else {
          // Do something here
          await photoApi.editPhoto(values)
          const action = updatePhoto(values);
          dispatch(action);
        }

        history.push('/photos');
        resolve(true);
      }, 2000);
    });
  }

  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo 😎" />

      <div className="photo-edit__form">
        <PhotoForm
          isAddMode={isAddMode}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default AddEditPage;