import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const Addstudenttogroupdialog = (props) => {
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [otchestvo, setOtchestvo] = React.useState('');

  const addStudent = async (event) => {
    props.handleCloseDialog();
    await props.asyncAddStudentFromGroup(props.token, name, surname, otchestvo, props.group);
    await props.asyncGetGroupInfo(props.token, props.group);
    setName('');
    setSurname('');
    setOtchestvo('');
  };

  return (
    <div>
      <Dialog open={props.openDialogForm} onClose={props.handleCloseDialog} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Добавить СТудента</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Заполните форму
        </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='surname'
            label='Фамилия'
            fullWidth
            value={name}
            onChange={(event) => { setName(event.target.value); }}
          />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Имя'
            fullWidth
            value={surname}
            onChange={(event) => { setSurname(event.target.value); }}
          />
          <TextField
            autoFocus
            margin='dense'
            id='otchestvo'
            label='Отчество'
            fullWidth
            value={otchestvo}
            onChange={(event) => { setOtchestvo(event.target.value); }}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseDialog} color='primary'>
            Назад
          </Button>
          <Button onClick={addStudent}
            color='primary'
          >
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
};

