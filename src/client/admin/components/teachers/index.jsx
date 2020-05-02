import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

const Teachers = (props) => {
  props.setSelectedIndex(2);
  const classes = useStyles();
  const teachers = props.teachers.map((teacher, i) => (
    { value: teacher, label: teacher }
  ));

  const handleChangeTeacher = (event) => {
    console.log(event.value);
  };

  return (
    <div className='Teachers'>
      <h2>Выберите группу</h2>
      <Select
        onChange={handleChangeTeacher}
        options={teachers}
        styles={{
          valueContainer: (base) => ({
            ...base,
            minHeight: '30px',
            justifyContent: 'center',
          }),
          indicatorSeparator: () => ({}),
          dropdownIndicator: (base) => ({
            ...base,
            color: '#F79329',
            '&:hover': {
              color: '#F79329',
            },
          }),
          control: (base) => ({
            ...base,
            borderColor: 'gray',

            '&:hover': {},
          }),
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  state,
  login: state.mainAdminPage.user.login,
  teachers: ['Никишина Ирина Николаевна', 'Жукова Галина Севастьянова', 'Бойкова Галина Васильевна'],
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
