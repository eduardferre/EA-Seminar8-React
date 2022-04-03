import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserService from '../services/UserService';
import IUser from '../types/User';

function User(): JSX.Element {

    const { userName } = useParams();
    let navigate = useNavigate();

    const initialUserState = {
        _id: null,
        name: "",
        age: "",
        password: "",
    };

    const [currentUser, setCurrentUser] = useState<IUser>(initialUserState);
    const [message, setMessage] = useState<string>("");
    const [user, setUser] = useState<String>("");

    const getUser = (userName: string) => {
        UserService.get(userName)
            .then((response: any) => {
                setCurrentUser(response.data);
                console.log(response.data);
                setUser(userName);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (userName)
            getUser(userName);
    }, [userName]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const updateUser = () => {
        UserService.update(user, currentUser)
            .then((response: any) => {
                console.log(response.data);
                setMessage("The user was updated successfully!");
                setUser(currentUser.name);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteUser = () => {
        UserService.remove(user)
            .then((response: any) => {
                console.log(response.data);
                navigate("/");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div className="user">
            {currentUser ? (
                <div className="edit-form">
                    <h4>User</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="mane">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentUser.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input
                                type="text"
                                className="form-control"
                                id="age"
                                name="age"
                                value={currentUser.age}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                name="password"
                                value={currentUser.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                    <button className="badge badge-danger mr-2" onClick={deleteUser}>
                        Delete
                    </button>
                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateUser}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a User...</p>
                </div>
            )}
        </div>

    );
}

export default User;
