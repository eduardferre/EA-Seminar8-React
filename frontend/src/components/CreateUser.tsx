import React, { useState, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserService from '../services/UserService';
import IUser from '../types/User';

function CreateUser(): JSX.Element {

    const initialUserState = {
        id: null,
        name: "",
        age: "",
        password: ""
    };
    const [user, setUser] = useState<IUser>(initialUserState);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const saveUser = () => {
        var data = {
            name: user.name,
            age: user.age,
            password: user.password
        };
        console.log(data);
        UserService.create(data)
            .then((response: any) => {
                setUser({
                    _id: response.data._id,
                    name: response.data.name,
                    age: response.data.age,
                    password: response.data.password
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const newUser = () => {
        setUser(initialUserState);
        setSubmitted(false);
    };

    return (
        <div className="user">
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={newUser}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={user.name}
                                onChange={handleInputChange}
                                name="name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input
                                type="text"
                                className="form-control"
                                id="age"
                                required
                                value={user.age}
                                onChange={handleInputChange}
                                name="age"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                required
                                value={user.password}
                                onChange={handleInputChange}
                                name="password"
                            />
                        </div>
                        <button onClick={saveUser} className="btn btn-success">
                            Submit
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateUser;
