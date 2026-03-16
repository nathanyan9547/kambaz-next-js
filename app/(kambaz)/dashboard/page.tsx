"use client"
import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { enrollCourse, unenrollCourse } from "../enrollments/reducer";
import { RootState } from "../store";

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
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<Course>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });

  const hasPerms = currentUser?.role === "ADMIN" || currentUser?.role === "FACULTY"; // So we can create restrictions if they are a student

  const isEnrolled = (courseId: string) =>
    enrollments.some((e) => e.user === currentUser?._id && e.course === courseId);

  const displayedCourses = showAllCourses
    ? courses
    : (courses as Course[]).filter((c) => isEnrolled(c._id));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <Button className="float-end btn btn-primary"
                id="wd-enrollments-click"
                onClick={() => setShowAllCourses(!showAllCourses)}>
          Enrollments
        </Button>
      </h1> <hr />

      {hasPerms && (
        <>
          <h5>New Course
            <Button variant="primary float-end"
                    id="wd-add-new-course-click"
                    onClick={() => dispatch(addNewCourse(course))}>
              Add
            </Button>
            <Button variant="warning float-end me-2"
                    id="wd-update-course-click"
                    onClick={() => dispatch(updateCourse(course))}>
              Update
            </Button><br />
            
            <FormControl value={course.name} className="mb-2" 
              onChange={(e) => setCourse({ ...course, name: e.target.value })} />
            <FormControl as="textarea" value={course.description} rows={3}
              onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          </h5><hr />
        </>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({displayedCourses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {(displayedCourses).map((course) => ( // stretched size of cards from 300px to 325px to fit all 4 buttons in 1 row
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "325px" }}>
              <Card>
                <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name}</CardTitle>
                  <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    {course.description}</CardText>

                  {isEnrolled(course._id) ? (
                    <Link href={`/courses/${course._id}/home`} className="btn btn-primary">
                      Go
                    </Link>
                  ) : (
                    <Button variant="secondary" disabled>Go</Button> // not enrolled, can't enter course
                  )}

                  {currentUser && (
                    isEnrolled(course._id) ? (
                      <Button variant="danger" className="float-end"
                              id="wd-unenroll-click"
                              onClick={() => dispatch(unenrollCourse({
                                userId: currentUser._id, courseId: course._id
                              }))}>
                        Unenroll
                      </Button>
                    ) : (
                      <Button variant="success" className="float-end"
                              id="wd-enroll-click"
                              onClick={() => dispatch(enrollCourse({
                                userId: currentUser._id, courseId: course._id
                              }))}>
                        Enroll
                      </Button>
                    )
                  )}

                  {hasPerms && ( // Faculty and Admin can delete and edit
                    <>
                      <Button onClick={(event) => {
                              event.preventDefault();
                              dispatch(deleteCourse(course._id));
                            }}
                              variant="danger me-1 float-end"
                              id="wd-delete-course-click">
                        Delete
                      </Button>
                      <Button id="wd-edit-course-click"
                              onClick={(event) => {
                                event.preventDefault();
                                setCourse(course);
                              }}
                              variant="warning me-1 float-end" >
                        Edit
                      </Button>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
