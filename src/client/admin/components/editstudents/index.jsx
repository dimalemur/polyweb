import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Link from '@material-ui/core/Link';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { asyncGetStudent, asyncGetStudentData } from '../../store/middleware/asyncGetStudent';
import { asyncAddStudentInfo } from '../../store/middleware/asyncAddStudentInfo';
import { asyncEditStudentData, asyncDeleteStudentOrdersData, asyncAddStudentOrdersData } from '../../store/middleware/asyncEditStudentInfo';
import { setLoading } from '../../store/reducers/studentsPageReducer';
import { StudentinfoEditItem } from '../studentinfoedititem';
import { StudentinfoAddItem } from '../srudentinfoadditem';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  orders: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '3em',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  button: {
    margin: theme.spacing(1),
    height: '55%%',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  edittext: {
    '& > *': {
      margin: theme.spacing(1),
    },
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  list: {
    marginTop: '3em',
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  demo: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  fab: {
    margin: theme.spacing(2),
  },
  fabWrap: {
    width: '100%',
    justifyContent: 'center',
  },

}));

const Studentinfo = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [studentInfo, editStudentInfo] = React.useState({
    name: '',
    faq: '',
    course: null,
    group: '',
    specialty: '',
    specialization: '',
    period: null,
    form: '',
    financing: '',
    level: '',
    year: '',
    email: '',
    tel: '',
    orders: [],
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [addStudentDataMode, setAddStudentDataMode] = React.useState(false);

  // ВОТ ТУТ НАДО ДОБАВИТЬ АСИНХРОННОЕ ДОБАВЛЕНИЕ ДАННЫХ О СТУДЕНТЕ ----------------------- //
  const handleAddStudentData = (event, userData, userId) => {
    const addData = userData;
    addData.userId = userId;
    console.log(addData);
    props.asyncAddStudentInfo(props.token, userId, addData);
  };

  const savingEditStudentInfo = (key, value) => {
    editStudentInfo({ ...studentInfo, [key]: value });
    console.log(studentInfo);
  };
  // ВОТ ТУТ НАДО ДОБАВИТЬ АСИНХРОННОЕ ДОБАВЛЕНИЕ ДАННЫХ О СТУДЕНТЕ ----------------------- //

  return (
    <div className='Students-Info'>
      <div className={props.classes.list}>
        {
          (props.studentData !== undefined)
            ? Object.keys(props.studentData).map((key, i) => {
              if (key !== '__v' && key !== '_id') {
                return (
                  <StudentinfoEditItem key={i}
                    kkey={key}
                    value={props.studentData[key]}
                    userDataId={props.studentData._id}
                    userId={props.studentData.userId}
                    classes={props.classes}
                    index={i}
                    handleChange={handleChange}
                    expanded={expanded}
                    token={props.token}
                    asyncEditStudentData={props.asyncEditStudentData}
                    asyncDeleteStudentOrdersData={props.asyncDeleteStudentOrdersData}
                    asyncAddStudentOrdersData={props.asyncAddStudentOrdersData}
                    setLoading={props.setLoading}
                  />
                );
              }
              return '';
            })
            : (
              <div>
                {
                  (!addStudentDataMode)
                    ? (
                      <div>
                        Запись студента не найдена.
                        <Link
                          component='button'
                          variant='body2'
                          onClick={() => { setAddStudentDataMode(true); }}
                        >
                          Добавить запись?
                      </Link>
                      </div>
                    )
                    : (
                      <div>
                        {Object.keys(studentInfo).map((key, i) => {
                          if (key !== '__v' && key !== '_id') {
                            return (
                              <StudentinfoAddItem
                                value={studentInfo[key]}
                                savingEditStudentInfo={savingEditStudentInfo}
                                key={i}
                                kkey={key}
                                userDataId={1}
                                userId={props.studentId}
                                classes={props.classes}
                                index={i}
                                handleChange={handleChange}
                                expanded={expanded}
                                token={props.token}
                              />
                            );
                          }
                          return '';
                        })}
                        <Button
                          variant='contained'
                          color='primary'
                          size='small'
                          type='submit'
                          className={props.classes.button}
                          onClick={(event) => { handleAddStudentData(event, studentInfo, props.studentId); }}
                        >
                          Добавить
                        </Button>
                      </div>
                    )
                }
              </div>
            )
        }

        {
          (props.studentData !== undefined && Object.keys(props.studentData).length === 0) ? 'Студент не найден' : ''
        }

      </div>
    </div>
  );
};

const Studentinput = (props) => {
  const [studentId, setStudentId] = React.useState(null);

  const handleChangeStudent = (event) => {
    event.preventDefault();
    props.setLoading(true);
    props.asyncGetStudent(props.token, studentId);
  };
  return (
    <div className='Students-Input'>
      <Paper component='form' className={props.classes.root}>
        <InputBase
          className={props.classes.input}
          placeholder='Id'
          inputProps={{ 'aria-label': 'Id' }}
          onChange={(event) => { event.preventDefault(); setStudentId(event.target.value); }}
        />
        <IconButton type='submit' className={props.classes.iconButton} aria-label='search' onClick={handleChangeStudent}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

const Editstudents = (props) => {
  const token = window.localStorage.getItem('polyAdmin');
  const classes = useStyles();

  return (
    <div className='Students-Add'>
      <h2>Введите Id студента</h2>
      <Studentinput classes={classes} asyncGetStudent={props.asyncGetStudent} token={token} setLoading={props.setLoading} />

      <div className={classes.loader}>
        <Fade
          in={props.loading}
          style={{
            transitionDelay: props.loading ? '60ms' : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
      </div>

      <Studentinfo classes={classes}
        studentId={props.studentId}
        studentData={props.studentData}
        token={token}
        asyncEditStudentData={props.asyncEditStudentData}
        asyncDeleteStudentOrdersData={props.asyncDeleteStudentOrdersData}
        asyncAddStudentOrdersData={props.asyncAddStudentOrdersData}
        setLoading={props.setLoading}
        asyncAddStudentInfo={props.asyncAddStudentInfo}
      />

    </div>
  );
};

const mapStateToProps = (state) => ({
  state,
  login: state.studentPage.student.login,
  studentData: state.studentPage.studentData,
  studentId: state.studentPage.student._id,
  loading: state.studentPage.loading,
});
const mapDispatchToProps = (dispatch) => ({
  asyncGetStudent: (token, userId) => {
    dispatch(asyncGetStudent(token, userId));
  },
  setLoading: (val) => {
    dispatch(setLoading(val));
  },
  asyncGetStudentData: (token, username) => {
    dispatch(asyncGetStudentData(token, username));
  },
  asyncEditStudentData: (token, id, userId, newData) => {
    dispatch(asyncEditStudentData(token, id, userId, newData));
  },
  asyncDeleteStudentOrdersData: (token, userId, pageId, orderId) => {
    dispatch(asyncDeleteStudentOrdersData(token, userId, pageId, orderId));
  },
  asyncAddStudentOrdersData: (token, userId, pageId, name, url) => {
    dispatch(asyncAddStudentOrdersData(token, userId, pageId, name, url));
  },
  asyncAddStudentInfo: (token, userId, studentInfo) => {
    dispatch(asyncAddStudentInfo(token, userId, studentInfo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Editstudents);
