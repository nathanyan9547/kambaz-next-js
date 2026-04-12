"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../Table";
import * as client from "../../../client";

type User = {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

export default function People() {
  const { cid } = useParams() as { cid: string };
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const users = await client.findUsersForCourse(cid);
    setUsers(users);
  };

  useEffect(() => {
    const load = async () => {
      const users = await client.findUsersForCourse(cid);
      setUsers(users);
    };
    load();
  }, [cid]);

  return (
    <div>
      <h3>People</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}