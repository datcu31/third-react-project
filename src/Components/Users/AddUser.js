import React, { useState, Fragment, useRef } from "react";

import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";

import styles from './AddUser.module.css';

const AddUser = (props) => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    // const [enteredUsername, setEnteredUsername] = useState('');
    // const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const addUserHandeler = (event) => {
        event.preventDefault();

        const enteredUsername = nameInputRef.current.value;
        const enteredAge = ageInputRef.current.value;
        
        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({ title: 'Invalide input', message: 'Please insert a valide name and age (non-empty values).' })
            return;
        }
        if (+enteredAge < 1) {
            setError({ title: 'Invalide age', message: 'Please insert a valide age (>0)' })
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
        nameInputRef.current.value = "";
        ageInputRef.current.value = "";
        // setEnteredUsername('');
        // setEnteredAge("");
    }

    // const usernameChangeHandler = (event) => {
    //     setEnteredUsername(event.target.value);
    // }

    // const ageChangeHandler = (event) => {
    //     setEnteredAge(event.target.value);
    // }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <Fragment>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
            <Card className={styles.input}>
                <form onSubmit={addUserHandeler}>
                    <label htmlFor="username" >Username</label>
                    <input
                        id="username"
                        type='text'
                        // value={enteredUsername}
                        // onChange={usernameChangeHandler}
                        ref={nameInputRef}
                    />
                    <label htmlFor="age" >Age (Years)</label>
                    <input
                        id="age"
                        type='number'
                        // value={enteredAge}
                        // onChange={ageChangeHandler}
                        ref={ageInputRef}
                    />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Fragment>
    );
};

export default AddUser;