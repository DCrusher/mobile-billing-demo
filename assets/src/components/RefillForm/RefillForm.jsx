import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';

import TelephoneInput from './TelephoneInput.jsx';
import MoneyInput from './MoneyInput.jsx';
import MessageBar from '../MessageBar/MessageBar.jsx';

import MESSAGE_TYPES from '../../constants/message_types';

const AMOUNT_BOUNDARIES = {
  min: 1,
  max: 1000
};
const NUMBER_REGEXP = /\(\d{4}\)?\s\d{3}-?\d{4}/i;
const MESSAGES = {
  numberIncorrect: 'The number is incorrect. Please enter a valid one.',
  paymentSuccessful: 'Payment was successful. Now you will be ',
  redirected: 'redirected'
}
const REDIRECT_TO_MAIN_PAGE_DELAY = 3000;


const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 5
  },
  toListButton: {
    marginTop: theme.spacing.unit * 2
  },
  caption: {
    margin: `${theme.spacing.unit * 5} 0 ${theme.spacing.unit * 5} 0`
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit 
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  successfulMainText: {
    paddingRight: theme.spacing.unit
  }
})

class RefillFrom extends React.Component {
  state = {
    number: '(8   )    -    ',
    amount: '20',
    message: {
      text: '',
      variant: MESSAGE_TYPES.error
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    
    this.validateNumber()
      .then(() => {
        this.sendPayment()
      })
      .catch((error) => {
        this.setState({
          message: {
            text: error,
            variant: MESSAGE_TYPES.error
          }
        })
      });
  }

  sendPayment() {
    const { number, amount } = this.state;
    const { onRefill, operator, history, classes } = this.props;

    onRefill({
      number,
      amount,
      operator: operator.id
    })
      .then(() => {
        this.setState({
          message: {
            text: (
              <React.Fragment>
                <span className={classes.successfulMainText}>
                  {MESSAGES.paymentSuccessful}
                </span>
                <Link to='/'>{MESSAGES.redirected}</Link>
              </React.Fragment>
            ),
            variant: MESSAGE_TYPES.success
          }
        })

        setTimeout(() => history.push('/'), REDIRECT_TO_MAIN_PAGE_DELAY);
      })
      .catch((error) => {
        this.setState({
          message: {
            text: error.message,
            variant: MESSAGE_TYPES.error
          }
        })
      })
  }

  handleNumberChange = event => {
    this.setState({
      number: event.target.value,
    });
  };

  handleAmountChange = (event) => {
    let amount = event.target.value;
    const maxBoundary = AMOUNT_BOUNDARIES.max;
    const minBoundary = AMOUNT_BOUNDARIES.min;

    if (amount > maxBoundary) {
      amount = maxBoundary;
    } else if (amount < minBoundary) {
      amount = minBoundary;
    }

    this.setState({ amount });
  }

  handleToListClick = (event) => {
    this.props.history.push('/');
  }

  handleMessageClose = () => {
    this.setState({ 
      message: {
        text: '',
        variant: MESSAGE_TYPES.error
      } 
    });
  }

  validateNumber() {
    const { number } = this.state;

    return new Promise((resolve, reject) => {
      const isNumberValid = NUMBER_REGEXP.test(number);

      if (isNumberValid) {
        resolve();
      } else {
        reject(MESSAGES.numberIncorrect);
      }
    });
  }

  render() {
    const { number, amount, message } = this.state;
    const { classes, operator } = this.props;

    return (
      <React.Fragment>
        <Button 
          variant='outlined' 
          size='medium' 
          color='primary' 
          className={classes.toListButton} 
          onClick={this.handleToListClick}
        >
          Back to List
        </Button>

        <form
          className={classes.form} 
          onSubmit={this.handleSubmit}
        >
          <Grid container spacing={24}>
            <Grid 
              item xs={12} md={6}
              className={classes.caption} 
            >
              <Typography 
                variant='h6' 
                gutterBottom
              >
                Refill account for {operator.name} (ID: {operator.id})
              </Typography>
            </Grid>
            <Grid 
              item xs={12} md={6}
              className={classes.caption} 
            >
              <Chip
                label={`Balance: $ ${operator.totalBalance}`}
                color='primary'
                variant='outlined'
              />
            </Grid>
            <Grid 
              item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='formatted-text-mask-input'>
                  Telephone Number
                </InputLabel>
                <Input
                  value={number}
                  onChange={this.handleNumberChange}
                  id='formatted-text-mask-input'
                  inputComponent={TelephoneInput}
                />
            </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label='Amount'
                value={amount}
                onChange={this.handleAmountChange}
                id='formatted-amount-input'
                InputProps={{
                  inputComponent: MoneyInput,
                }}
                fullWidth
              />
            </Grid>
          </Grid>

          <Button
            className={classes.submit}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
          >
            Refill
          </Button>
        </form>
                
        <MessageBar
          open={!!message.text}
          variant={message.variant}
          message={message.text}
          onClose={this.handleMessageClose}
        />

      </React.Fragment>
    );
  }
}

RefillFrom.propTypes = {
  operator: PropTypes.object,
  onRefill: PropTypes.func
}

export default withRouter(withStyles(styles)(RefillFrom));