import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_FAILURE } from '../../redux/actions/actionTypes/auth.action-types';
import { OPEN_FAILURE, OPEN_SUCCESS } from '../../redux/actions/actionTypes/authModal.action-types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export default function Header() {
  const dispatch = useDispatch();
const isAuth = useSelector(({auth}) => auth.isLoggedIn);
// const isModalOpen = useSelector(({modalOpen}) => modalOpen.isModalOpen);

    const handleOpenAuthModal = () => {
      dispatch({type: OPEN_SUCCESS});
    };
  

    const handleLogOut = () => {
      fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          dispatch({type: OPEN_FAILURE});
          dispatch({type: LOGIN_FAILURE});
          console.log(data.message);
        })
        .catch(error => {
          console.error('An error occurred while logging out:', error);
        });
    }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        {isAuth && 
          <div className="add-post" style={{cursor: 'pointer', marginRight: '20px', display: 'flex', alignItems: 'center'}}>
           <AddCircleOutlineIcon />
           <span>Create Article</span>
          </div>
        }
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            {isAuth && 
              <p>Hello, admin</p>
            }
          </Typography>

          {isAuth ?
            <Button color="inherit" onClick={() => handleLogOut()}>Log Out</Button>
          :
          <Button color="inherit" onClick={handleOpenAuthModal}>Login</Button>
          }
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}