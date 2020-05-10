import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import user from '../../../../server/models/user';

const useStyles = makeStyles((theme) => ({
  swtitch: {
    margin: 0,
  },
  dialog: {
    minWidth: '60vw',
  },
}));

export const Addstudenttogroupdialog = (props) => {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [otchestvo, setOtchestvo] = React.useState('');
  const [id, setId] = React.useState('');
  const [mode, setMode] = React.useState(false);

  const addStudentByFullName = async (event) => {
    props.handleCloseDialog();
    await props.asyncAddStudentFromGroup(props.tтoken, name, surname, otchestvo, props.group);
    // const userData = await props.asyncGetStudentByFnameAndGroup(props.token, name, surname, otchestvo, props.group);
    // console.log(userData);

    // const [userId, _id] = userData;
    // await props.asyncEditStudentData(props.token, _id, userId, { group: props.group });
    await props.asyncGetGroupInfo(props.token, props.group);
    setName('');
    setSurname('');
    setOtchestvo('');
  };

  const addStudentById = async (event) => {
    props.handleCloseDialog();
    const student = await props.asyncGetStudentById(props.token, id);
    if (student !== undefined) {
      const [names, surnames, otchestvos] = student.userData.name.split(' ');
      if (student.userData.group === '') {
        await props.asyncAddStudentFromGroup(props.token, names, surnames, otchestvos, props.group);
        await props.asyncGetGroupInfo(props.token, props.group);
      } else {
        alert('Этот студент уже в группе!');
      }
    }
    setId('');
  };

  return (
    <div>
      <Dialog maxWidth={false} open={props.openDialogForm} onClose={props.handleCloseDialog} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title' className={classes.dialog}>Добавить Студента</DialogTitle>
        <DialogContent>
          <DialogContentText component='div'>
            <Typography component='div'>
              <Grid component='div' container alignItems='center' spacing={1}>
                <Grid item>Id студента</Grid>
                <Grid item>
                  <FormControlLabel
                    className={classes.swtitch}
                    control={<Switch checked={mode} onChange={(event) => { setMode(!mode); }} name='checkedA' />}
                  />
                </Grid>
                <Grid item>Фио</Grid>
              </Grid>
            </Typography>
          </DialogContentText>

          {
            (mode)
              ? (
                <>
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
                    margin='dense'
                    id='name'
                    label='Имя'
                    fullWidth
                    value={surname}
                    onChange={(event) => { setSurname(event.target.value); }}
                  />
                  <TextField
                    margin='dense'
                    id='otchestvo'
                    label='Отчество'
                    fullWidth
                    value={otchestvo}
                    onChange={(event) => { setOtchestvo(event.target.value); }}
                  />
                </>
              ) : (
                <TextField
                  autoFocus
                  margin='dense'
                  id='surname'
                  label='Id студента'
                  fullWidth
                  value={id}
                  onChange={(event) => { setId(event.target.value); }}
                />
              )
          }

        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseDialog} color='primary'>
            Назад
          </Button>
          <Button onClick={(mode) ? addStudentByFullName : addStudentById}
            color='primary'
          >
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
};

