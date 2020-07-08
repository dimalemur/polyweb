import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export const FormDialog = (props) => {
  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');
  return (
    <div>
      <Dialog open={props.isOpenDialog} onClose={props.handleCloseDiadlog} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Добавить приказ</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Название приказа'
            type='email'
            onChange={(event) => { setName(event.target.value); }}
            value={name}
            fullWidth
          />
          <TextField
            autoFocus
            margin='dense'
            id='url'
            label='Ссылка на приказ'
            type='email'
            onChange={(event) => { setUrl(event.target.value); }}
            value={url}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseDiadlog} color='primary'>
            Назад
          </Button>
          <Button onClick={(event) => { props.addOrder(event, name, url, props.kkey); }} color='primary'>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
