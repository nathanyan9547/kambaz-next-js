"use client"
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const [module, setModule] = useState({
    id: 1, name: "NodeJS Module",
    description: "Create a NodeJS server with EXpressJS",
    course: "Web dev",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`

  return (
    <div>
      <h3 id="wd-working-with-objects">Working With Objects</h3>

      
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Assignment Title </a>
      <FormControl className="w-50 mb-2" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      
      <a id="wd-update-assignment-score"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
        Update Assignment Score</a>
      <FormControl className="w-50 mb-2" id="wd-assignment-score"
        type="number" defaultValue={assignment.score}
        onChange={(e) => setAssignment({ ...assignment, score: parseInt(e.target.value) })} />
      
      <input type="checkbox" id="wd-assignment-completed"
        defaultChecked={assignment.completed}
        onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })} />
      <a id="wd-update-assignment-completed" className="btn btn-primary ms-3 float-end"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
        Update Assignment Completed
      </a><br/><br/>

      <a id="wd-update-module-name" className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Name
      </a>
      <FormControl className="w-50 mb-2" id="wd-module-name"
        defaultValue={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })} />
  
      <a id="wd-update-module-description" className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/description/${module.description}`}>
        Update Description
      </a>
      <FormControl className="w-50" id="wd-module-description"
        defaultValue={module.description}
        onChange={(e) => setModule({ ...module, description: e.target.value })} />
      <hr />
      
      
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary me-2"
         href={`${ASSIGNMENT_API_URL}`}>
        Get Assignment
      </a>
      <a id="wd-retrieve-module" className="btn btn-primary"
         href={`${MODULE_API_URL}`}>
        Get Module
      </a><hr/>
      
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary me-2"
         href={`${ASSIGNMENT_API_URL}/title`}>
        Get Assignment Title
      </a>
      <a id="wd-retrieve-module-name" className="btn btn-primary"
         href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a><hr/>

    </div>
);}
