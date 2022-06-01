import React from 'react';
import PropTypes from 'prop-types';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';

import './FilesDragAndDrop.scss';

export default function FilesDragAndDrop({onUpload}) {
  return (
    <div className='FilesDragAndDrop__area'>
      Drag image(s) and drop to upload
      <span
        role='img'
        aria-label='emoji'
        className='area__icon'
      >
        {/* <PhotoSizeSelectActualOutlinedIcon/> */}
      </span>
    </div>
  );
}

FilesDragAndDrop.propTypes = {
  onUpload: PropTypes.func.isRequired,
};