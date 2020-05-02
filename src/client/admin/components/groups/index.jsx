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

const Gruops = (props) => {
  const classes = useStyles();
  props.setSelectedIndex(0);
  const groups = props.groups.map((group, i) => (
    { value: group, label: group }
  ));

  const handleChangeGroup = (event) => {
    console.log(event.value);
  };

  return (
    <div className='Groups'>
      <h2>Выберите группу</h2>
      <Select
        onChange={handleChangeGroup}
        options={groups}
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
  groups: ['181-362', '181-363', '191-363'],
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Gruops);
