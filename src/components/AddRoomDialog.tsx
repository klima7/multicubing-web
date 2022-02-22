import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppSelector, useAppThunkDispatch } from '../utils/hooks';
import { clearAddRoomDialog } from '../actions/add-room-actions';
import CubeSelector from './CubeSelector';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Cube } from '../utils/cubes';

export default function AddRoomDialog() {

  const dispatch = useAppThunkDispatch();
  const open = useAppSelector(state => state.addRoom.open);

  const handleClose = () => {
    dispatch(clearAddRoomDialog());
  };

  const handleAdd = () => {
    dispatch(clearAddRoomDialog());
  };

  const handleCubeChange = (cube: Cube) => {
    console.log(`Cube changed to ${cube}`)
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Add room</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText> */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <CubeSelector onChange={handleCubeChange} />
          </Grid>
          <Grid item xs={8}>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
