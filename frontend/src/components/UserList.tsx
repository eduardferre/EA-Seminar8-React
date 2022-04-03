import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import UserService from '../services/UserService';
import IUser from '../types/User';

function UserList(): JSX.Element {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    UserService.getAll()
      .then((response: any) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const setActiveUser = (user: IUser, index: number) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  return (
    <div className="user">
      <div className="list row">
        <div className="col-md-6">
          <h4>User List</h4>
          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveUser(user, index)}
                  key={index}
                >
                  {user.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>User</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentUser.name}
              </div>
              <div>
                <label>
                  <strong>Age:</strong>
                </label>{" "}
                {currentUser.age}
              </div>
              <div>
                <label>
                  <strong>Password:</strong>
                </label>{" "}
                {currentUser.password}
              </div>
              <Link
                to={"/edit/" + currentUser.name}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a User...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserList;
