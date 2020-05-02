import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

const Addinfo = (props) => {
  props.setSelectedIndex(3);
  const classes = useStyles();
  const [personType, setPersonType] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');

  const handleRadioChange = (event) => {
    setPersonType(event.target.value);
    setError(false);
    setHelperText('');
  };

  // Заполнение списка для Select
  const persons = props.persons.map((person, i) => (
    { value: person, label: person }
  ));

  const handleChangePerson = (event) => {
    console.log(event.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (personType === '') {
      setError(true);
      setHelperText('Выберите хотябы одно значение');
    }
    console.log(personType);
  };

  return (
    <div className='Addinfo'>
      <h2>Выберите студента/преподавателя</h2>

      <form onSubmit={handleSubmit}>
        <FormControl component='fieldset' error={error} className={classes.formControl}>
          <RadioGroup aria-label='quiz' name='quiz' value={personType} onChange={handleRadioChange}>
            <FormControlLabel value='teacher' control={<Radio />} label='Преподаватель' />
            <FormControlLabel value='srudent' control={<Radio />} label='Студент' />
          </RadioGroup>
          <FormHelperText>{helperText}</FormHelperText>
          <Button type='submit' variant='outlined' color='primary' className={classes.button}>
            Check Answer
        </Button>
        </FormControl>
      </form>

      <Select
        onChange={handleChangePerson}
        options={persons}
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
  persons: ['Хван Дмитрий Алексеевич', 'Подов Гордей Семенович', 'Быкова Елизавета Данииловна'],
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Addinfo);
