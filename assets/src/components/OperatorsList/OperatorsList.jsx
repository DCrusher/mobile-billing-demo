import React from 'react';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import InboxIcon from '@material-ui/icons/Inbox';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';

import { observer, inject } from 'mobx-react';
import OperatorsStore from '../../stores/OperatorsStore';

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

export default withStyles(styles)(OperatorsList)