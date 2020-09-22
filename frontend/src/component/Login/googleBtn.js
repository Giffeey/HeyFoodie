import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';


const CLIENT_ID = '460267343315-e1hai5hpkjunjjgf6gh9hibevn9ag4hq.apps.googleusercontent.com';


class GoogleBtn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogined: false,
            accessToken: '',
            name: { givenName: '', familyName: '' },
            email: ''
        };

        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    }

    login(response) {
        if (response.accessToken) {
            console.log('[Login Success] currentUser:', response.profileObj.givenName, response.profileObj.familyName)
            this.setState(state => ({
                isLogined: true,
                accessToken: response.accessToken,
                name: { givenName: response.profileObj.givenName, familyName: response.profileObj.familyName },
                email: response.profileObj.email
            }));

        }
    }

    logout(response) {
        this.setState(state => ({
            isLogined: false,
            accessToken: '',
            name: { givenName: '', familyName: '' },
            email: ''
        }));
    }

    handleLoginFailure(response) {
        alert('Failed to log in')
    }

    handleLogoutFailure(response) {
        alert('Failed to log out')
    }


    render() {
        return (

            <div>

                <div>
                    {this.state.name.givenName ? <p> Welcome {this.state.name.givenName} {this.state.name.familyName} <br /> email: {this.state.email} </p>  : null}
                </div>
                { this.state.isLogined ?
                    <GoogleLogout
                        clientId={CLIENT_ID}
                        buttonText='LOGOUT'
                        onLogoutSuccess={this.logout}
                        onFailure={this.handleLogoutFailure}
                    >
                    </GoogleLogout> : <GoogleLogin
                        clientId={CLIENT_ID}
                        buttonText='LOGIN WITH GOOGLE'
                        onSuccess={this.login}
                        onFailure={this.handleLoginFailure}
                        isSignedIn={true}
                        cookiePolicy={'single_host_origin'}
                        responseType='code,token'
                        scope='profile email'
                    />
                }
                {/* { this.state.accessToken ? <h5>Your Access Token: <br/><br/> { this.state.accessToken }</h5> : null } */}

            </div>
        )
    }
}

export default GoogleBtn;