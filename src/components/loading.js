import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';


export default function LoadingCircular() {

    return (
        <div>
        <Backdrop className="loading"  open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
}