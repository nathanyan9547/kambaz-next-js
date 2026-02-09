import { Button, Form, FormControl } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-signin-screen">
      <h1>Profile</h1>
      <FormControl id="wd-username"
             placeholder="username"
             defaultValue="alice"
             className="mb-2"/>
      <FormControl id="wd-password"
             placeholder="password"
             defaultValue="123"
             className="mb-2"/>
      <FormControl id="wd-firstname"
             placeholder="First Name"
             defaultValue="Alice"
             className="mb-2"/>
      <FormControl id="wd-lastname"
             placeholder="Last Name"
             defaultValue="Wonderland"
             className="mb-2"/>
      <FormControl id="wd-dob"
             placeholder="mm/dd/yyyy" type="date"
             className="mb-2"/>
      <FormControl id="wd-email"
             placeholder="username@gmail.com" type="email"
             defaultValue="alice@wonderland.com"
             className="mb-2"/>
      <Form.Select id="wd-role" defaultValue="User">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </Form.Select> <br/>
      <Button id="wd-signout-btn"
            href="/account/signin"
            variant="danger"
            className="btn btn-primary w-100 mb-2">
            Signout </Button>
    </div>
);}
