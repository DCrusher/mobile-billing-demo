import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { Route, Switch, withRouter } from 'react-router-dom';

import OperatorsList from '../OperatorsList/OperatorsList.jsx'
import RefillForm from '../RefillForm/RefillForm.jsx'


const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

@inject('operators', 'auth')
@observer
class UserCabinet extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              SHAKURO: Mobile Billing
            </Typography>
            <Button 
              color="primary" 
              variant="outlined"
              onClick={this.handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <main className={classes.layout}>
          {/* <Typography variant="h6" align="center" color="textSecondary" component="p">
            To top up the balance, select a mobile operator from the list.
          </Typography> */}
          
          <Switch>
            <Route exact path="/" render={() => (
              <OperatorsList
                onClickItem={this.handleItemClick}
              />
            )} />
            <Route path="/refill/:operatorName" render={() => (
              <RefillForm
                operator={this.props.operators.selected}
              />
            )} />
          </Switch>
          
          
        </main>
      </React.Fragment>
    );
  }

  handleLogout = () => {
    this.props.auth.logout()
      .then(() => (
        this.props.history.push('/signin')
      ));
  }

  handleItemClick = (operator) => {
    const { history, operators: operatorsStore } = this.props;
    
    operatorsStore.setSelected(operator);
    history.push(`/refill/${operator.name}`);
  }
}

UserCabinet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter((withStyles(styles)(UserCabinet)));