import React, { useContext } from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { SessionContext } from '../../app';
import { updateSession } from '../../store/sessions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default connect(null, (dispatch) => {
  return {
    updateSession: (sessionId, sessionTime) =>
      dispatch(updateSession(sessionId, sessionTime)),
  };
})(function (props) {
  const classes = useStyles();
  const { updateSession, toggleTimer } = props;
  const { setCountDown } = useContext(SessionContext);
  const currentSession = useSelector((state) => state.currentSession);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleStop = (ev) => {
    handleClose();
    updateSession(currentSession.id, { status: 'Done' });
    clearInterval(window.timer);
    setCountDown(false);
    toggleTimer(ev);
  };

  return (
    <div>
      <Button onClick={handleOpen}>stop</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Warning!!!!</h2>
            <p id="transition-modal-description">
              If you stop the focus session, this session will be considered
              unsuccessful! Do you want to end the session?
            </p>
            <Button onClick={handleClose}>Go back</Button>
            <Button onClick={handleStop}>End Session</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
});
