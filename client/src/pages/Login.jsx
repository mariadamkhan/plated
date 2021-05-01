import React from 'react';
import {useHistory } from "react-router-dom";
import {useState, useContext, useEffect} from 'react';
import FirebaseContext from '../context/firebase';

export default function Login() {
    const history = useHistory();
    const {firebase} = useContext(FirebaseContext);
//setting state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
//validation
    const isInvalid = (!password) || (!email)
    const handleSubmit = () => {};
//insert plated logo in the title
    useEffect(() => {
        document.title = 'Plated Login';
    }, []);

    return (
        <h1>Login Page</h1>
    )
}
