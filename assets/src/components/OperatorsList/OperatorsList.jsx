import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';

import { withStyles } from '@material-ui/core/styles';

import { observer, inject } from 'mobx-react';

const styles = theme => ({
  progressWrapper: {
    textAlign: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

@inject('operators')
@observer
class OperatorsList extends React.Component {
  render() {
    const { 
      operators: operatorsStore,
      classes
    } = this.props

    if (operatorsStore.isResponded()) {
      const operatorsList = operatorsStore.list

      return (
        <List component="nav">
          {
            operatorsList.map((operator) => {
              return (
                <ListItem 
                  key={operator.id}
                  onClick={this.props.onClickItem.bind(this, operator)}
                  button 
                >
                  <ListItemIcon>
                    <MobileScreenShareIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={operator.name}
                  />
                  <ListItemSecondaryAction>
                    <Chip
                      label={`Balance: $ ${operator.totalBalance}`}
                      color="primary"
                      variant="outlined"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
          }
        </List>
      );
    } else {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress className={classes.progress} />
        </div>
      );
    }
  }

  componentDidMount() {
    this.props.operators.getOperators();
  }
}

OperatorsList.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickItem: PropTypes.func
};

export default withStyles(styles)(OperatorsList)