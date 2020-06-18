// import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React, {Component} from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '../component/Typography';
// import AppFooter from '../component/AppFooter';
import AppBar from '../component/AppBar';
import AppForm from '../component/AppForm';
// import { email, required } from '../component/validation';
import { saveTokenIntoLocalStorage } from "../utils/Utils";
import RFTextField from '../component/RFTextField';
import FormButton from '../component/FormButton';
import FormFeedback from '../component/FormFeedback';
import Requests from "../requests/Requests";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            loginerror: ""
        };
    }

    handleNameChange = event => {
        this.setState({name: event.target.value});
    };

    handlePasswordChange = event => {
        this.setState({password: event.target.value});
    };

    handleSubmit = async event => {
        event.preventDefault();
        const {name, password} = this.state;
        const response = await Requests.create("/login", {name: name, password: password});
        if (!response.ok) {
            this.setState({loginerror: response.error});
        }
        if (response.auth) {
            saveTokenIntoLocalStorage(response);
            this.props.history.push("/");
        }

    };

    toRegister = () => {
        this.props.history.push("/register");
    };

    render() {
        return (
            <React.Fragment>
                <AppBar/>
                <AppForm>
                    <React.Fragment>
                        <Typography variant="h3" gutterBottom marked="center" align="center">
                            Sign In
                        </Typography>
                        <Typography variant="body2" align="center">
                            {'Not a member yet? '}
                            <Link href="/premium-themes/onepirate/sign-up/" align="center" underline="always">
                                Sign Up here
                            </Link>
                        </Typography>
                    </React.Fragment>
                    <Form onSubmit={this.handleSubmit} subscription={{submitting: true}} validate={this.validate}>
                        {({handleSubmit2, submitting}) => (
                            <form onSubmit={handleSubmit2} className={this.form} noValidate>
                                <Field
                                    autoComplete="email"
                                    autoFocus
                                    component={RFTextField}
                                    disabled={submitting || this.sent}
                                    fullWidth
                                    label="Email"
                                    margin="normal"
                                    name="email"
                                    required
                                    size="large"
                                />
                                <Field
                                    fullWidth
                                    size="large"
                                    component={RFTextField}
                                    disabled={submitting || this.sent}
                                    required
                                    name="password"
                                    autoComplete="current-password"
                                    label="Password"
                                    type="password"
                                    margin="normal"
                                />
                                <FormSpy subscription={{submitError: true}}>
                                    {({submitError}) =>
                                        submitError ? (
                                            <FormFeedback className={this.feedback} error>
                                                {submitError}
                                            </FormFeedback>
                                        ) : null
                                    }
                                </FormSpy>
                                <FormButton
                                    className={this.button}
                                    disabled={submitting || this.sent}
                                    size="large"
                                    color="secondary"
                                    fullWidth
                                >
                                    {submitting || this.sent ? 'In progress…' : 'Sign In'}
                                </FormButton>
                            </form>
                        )}
                    </Form>
                    <Typography align="center">
                        <Link underline="always" href="/premium-themes/onepirate/forgot-password/">
                            Forgot password?
                        </Link>
                    </Typography>
                </AppForm>
                {/*<AppFooter />*/}
            </React.Fragment>
        );
    }
}