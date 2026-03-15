"use client"
import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { RootState } from "../store";
import * as db from "../database";

type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  description: string;
  department?: string;
  credits?: number;
  image?: string;
  author?: string;
};

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = db;
  const dispatch = useDispatch();
  const [course, setCourse] = useState<Course>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>New Course
      <Button variant="primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))} >
              Add 
      </Button>
      <Button variant="warning float-end me-2"
              id="wd-update-course-click"
              onClick={() => dispatch(updateCourse(course))}>
              Update
      </Button><br />

      <FormControl value={course.name} className="mb-2" 
                  onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <FormControl as="textarea" value={course.description} rows={3}
                  onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
      </h5><hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter((course) =>
              enrollments.some(
                (enrollment) =>
                  enrollment.user === currentUser?._id &&
                  enrollment.course === course._id
                ))
            .map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/courses/${course._id}/home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark">
                  <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}</CardTitle>
                    <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description}</CardText>
                    <Button variant="primary">Go</Button>
                    <Button onClick={(event) => {
                              event.preventDefault();
                              dispatch(deleteCourse(course._id));
                            }}
                            variant="danger float-end"
                            id="wd-delete-course-click">
                            Delete
                    </Button>
                    <Button id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            variant="warning me-2 float-end" >
                            Edit
                    </Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
);}
