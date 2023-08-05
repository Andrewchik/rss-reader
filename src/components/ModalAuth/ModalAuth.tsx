import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import SignInForm from '../SignInForm/SignInForm';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_SUCCESS } from '../../redux/actions/actionTypes/authModal.action-types';

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
    dispatch({type: OPEN_SUCCESS, action: false});
  };

  return (
    <div>
      <Dialog
        open={isModalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <SignInForm />
      </Dialog>
    </div>
  );
}