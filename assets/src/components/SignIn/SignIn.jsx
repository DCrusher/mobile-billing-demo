import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import MessageBar from '../MessageBar/MessageBar.jsx';
import MESSAGE_TYPES from '../../constants/message_types';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

@inject('auth')
@observer
class SignIn extends React.Component {
  state = {
    emailAddress: '',
    password: '',
    rememberMe: false,
    message: {
      text: '',
      variant: MESSAGE_TYPES.error
    }
  }

  render() {
    const { classes } = this.props;
    const { 
      emailAddress,
      password, 
      message,
      rememberMe
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form 
              className={classes.form} 
              onSubmit={this.handleSubmit}
            >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="emailAddress">Email Address</InputLabel>
                <Input 
                  id="emailAddress" 
                  name="emailAddress"
                  autoComplete="emailAddress" 
                  value={emailAddress}
                  onChange={this.handleChangeInput}
                  autoFocus 
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={this.handleChangeInput}
                />
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox 
                    name="rememberMe"
                    color="primary" 
                    value="rememberMe"
                    checked={rememberMe}
                    onChange={this.handleChangeRememberMe}
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign in
              </Button>
            </form>
          </Paper>

          <MessageBar
            open={!!message.text}
            variant={message.variant}
            message={message.text}
            onClose={this.handleMessageClose}
          />
        </main>
      </React.Fragment>
    );
  }

  handleChangeInput = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleChangeRememberMe = (event) => {
    this.setState({rememberMe: event.target.checked})
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.auth.login(this.state)
      .then(() => (
        this.props.history.push('/')
      ))
      .catch((error) => (
        this.setState({
          message: {
            text: error.message,
            variant: MESSAGE_TYPES.error
          }
        })
      ))
  }

  handleMessageClose = (event) => {
    this.setState({
      message: {
        text: '',
        variant: MESSAGE_TYPES.error
      }
    })
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);