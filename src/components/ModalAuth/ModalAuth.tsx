import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop'; 
import { TransitionProps } from '@mui/material/transitions';
import SignInForm from '../SignInForm/SignInForm';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_FAILURE } from '../../redux/actions/actionTypes/authModal.action-types';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalAuth() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(({modalOpen}) => modalOpen.isModalOpen);

  const handleClose = () => {
    dispatch({type: OPEN_FAILURE});
  };

  return (
    <div style={{position: 'relative'}}>
      <Backdrop open={isModalOpen} onClick={handleClose} />
      <Dialog
        open={isModalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div 
        className="close" 
        style={{position: 'absolute', top: '5px', right: '5px', cursor: 'pointer'}}
        onClick={handleClose}
        >
          <CloseIcon />
        </div>
        <SignInForm />
      </Dialog>
    </div>
  );
}