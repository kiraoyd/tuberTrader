import {useCallback, useState} from "react";
import React from "react";
import {useAuth} from "../services/AuthService";
//TODO update to make sure this works this with Oauth service


export function Login() {

    //get the authContext using out custom hook, hides authContext
    const context = useAuth();

    //these get set with onChange() in the html below
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [submitFailed, setSubmitFailed] = useState(false);

    //this gets called in the html when the user submits something
    const onSubmitLogin = useCallback(
        async () => {
            if (context) {
                //here we are using that handleLogin function from our authContext
                //It gets the email and password from the actual user input html element like so:

                let loginSuccess = await context.handleLogin(email, password);
                if (!loginSuccess) {
                    console.log("Setting submit failed");
                    setSubmitFailed(true);
                }
            } else {
                console.log("Context is null");
            }
        }
        , [email, password, context, setSubmitFailed])


    return (
        <div>
            <div>Login</div>
            <div>
                {submitFailed ? (
                        <div>Your password or email was incorrect!</div>
                    )
                    : null}
            </div>
            <div>
                <label htmlFor="email">Email: </label>

                <input
                    type="text"
                    id="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                />
            </div>

            <div>
                <label htmlFor="password">Password: </label>
                <input
                    type="text"
                    id="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                />
            </div>

            <div>
                <button onClick={onSubmitLogin}>
                    Submit
                </button>
            </div>
        </div>
    );
}