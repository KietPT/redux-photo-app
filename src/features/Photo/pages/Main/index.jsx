/* eslint-disable react-hooks/exhaustive-deps */
import { unwrapResult } from '@reduxjs/toolkit';
import photoApi from 'api/photoApi';
import Banner from 'components/Banner';
import Images from 'constants/images';
import PhotoList from 'features/Photo/components/PhotoList';
import { getPhotoList } from 'features/Photo/photoSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';

MainPage.propTypes = {};

function MainPage(props) {
  const dispatch = useDispatch();
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const fetchPhotoList = async () => {
      // Get me when signed in
      // const action = getMe();
      try {
        const actionResult = await dispatch(getPhotoList());
        const photoList = unwrapResult(actionResult);
        setPhotos(photoList);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    }
    fetchPhotoList();
  }, []);

  //const photos = useSelector(state => state.photos);
  const history = useHistory();

  const handlePhotoEditClick = (photo) => {
    console.log('Edit: ', photo);
    const editPhotoUrl = `/photos/${photo.id}`;
    history.push(editPhotoUrl);
  }

  const handlePhotoRemoveClick = async (photo) => {
    console.log('Remove: ', photo.id);
    try {
      await photoApi.removePhoto(photo.id);
    } catch (error) {
      console.log('Failed to Remove photo : ', error);
    }
    
    // const action = removePhoto(photo.id);
    // dispatch(action);
    // history.push('/photos');
  }

  return (
    <div className="photo-main">
      <Banner title="🎉 Your awesome photos 🎉" backgroundUrl={Images.PINK_BG} />

      <Container className="text-center">
        <div className="py-5">
          <Link to="/photos/add">Add new photo</Link>
        </div>

        <PhotoList
          photoList={photos}
          onPhotoEditClick={handlePhotoEditClick}
          onPhotoRemoveClick={handlePhotoRemoveClick}
        />
      </Container>
    </div>
  );
}

export default MainPage;