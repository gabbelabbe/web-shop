import { iloginCredentials } from "../../shared/interface/states"

export const AdminUserList = ({ users }: { users: iloginCredentials[] }) => {

  return (
    <div>
      {
        users.map((user) => {
          return (
            <div>
              <h3>Username: {user.username}</h3>
              <h3>Eamil: {user.email}</h3>
              <h3>Address: {user.address}</h3>
              <h3>User type: {user.userType}</h3>
            </div>
          )
        })
      }
    </div>
  )
}