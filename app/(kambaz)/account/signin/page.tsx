"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

type User = {
  _id?: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  role?: string;
  loginId?: string;
  section?: string;
  lastActivity?: string;
  totalActivity?: string;
};

export default function Signin() {
 const [credentials, setCredentials] = useState<User>({ username: "", password: "" });
 const dispatch = useDispatch();
 const signin = async () => {
   const user = await client.signin(credentials);
   if (!user) return;
   dispatch(setCurrentUser(user));
   redirect("/dashboard");
 };
 return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl defaultValue={credentials.username}
             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
             className="mb-2" placeholder="username" id="wd-username" />
      <FormControl defaultValue={credentials.password}
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
             className="mb-2" placeholder="password" type="password" id="wd-password" />
      <Button onClick={signin} id="wd-signin-btn" className="w-100 mb-2" > Sign in </Button>
      <Link id="wd-signup-link" href="/account/signup"> Sign up </Link>
    </div>
);}