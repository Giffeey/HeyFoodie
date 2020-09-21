import React from 'react'
import GoogleLogin from "react-google-login"
import ggLogin from "./ggLogin"

export default function LoginWithGoogle() {
    function handleSubmit(event) {
        event.preventDefault()
        console.log(event.target.email.value)
        console.log(event.target.password.value)
    }

    const responseGoogle = async (response) => {
        let googleResponse = await ggLogin(response.accessToken)
        console.log(googleResponse);
        console.log(response);
    }

    return (
        <div>
            <div className="Google">
                <GoogleLogin
                    clientId="460267343315-e1hai5hpkjunjjgf6gh9hibevn9ag4hq.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />
            </div>
        </div>
    )
}
