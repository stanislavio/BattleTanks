import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import './modal.css';


export default function FormDialog(props) {
  const { open, title, children } = props;

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            {children}
      </Dialog>
    </div>
  );
}
