import React from 'react';
import { Grid, Button } from '@material-ui/core';

const PauseButton = (props) => {
  const { toggleTimer } = props;
  return (
    <Grid>
      <Button
        onClick={toggleTimer}
        style={{
          backgroundColor: '#5061a9',
          color: 'white',
          marginLeft: '4px',
          marginBottom: '10px',
          zIndex: 1,
          position: 'relative',
          top: '185px',
          left: '185px',
        }}
      >
        pause
      </Button>
    </Grid>
  );
};

export default PauseButton;
