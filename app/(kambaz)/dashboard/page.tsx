"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import * as client from "../courses/client";

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
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<Course>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });

  const fetchData = async () => {
    try {
      const enrolled = await client.findMyCourses();
      setMyCourses(enrolled);
      setEnrolledIds(enrolled.map((c: Course) => c._id));
      const all = await client.fetchAllCourses();
      setAllCourses(all);
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewCourse = async () => {
    await client.createCourse(course);
    await fetchData();
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    await fetchData();
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    await fetchData();
  };

  const onEnroll = async (courseId: string) => {
    if (!currentUser) return;
    await client.enrollIntoCourse(currentUser._id, courseId);
    await fetchData();
  };

  const onUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    await client.unenrollFromCourse(currentUser._id, courseId);
    await fetchData();
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const enrolled = await client.findMyCourses();
        setMyCourses(enrolled);
        setEnrolledIds(enrolled.map((c: Course) => c._id));
        const all = await client.fetchAllCourses();
        setAllCourses(all);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [currentUser]);

  const hasPerms = currentUser?.role === "ADMIN" || currentUser?.role === "FACULTY"; // So we can create restrictions if they are a student
  const isEnrolled = (courseId: string) => enrolledIds.includes(courseId);
  const displayedCourses = showAllCourses ? allCourses : myCourses;

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
                    onClick={onAddNewCourse}>
              Add
            </Button>
            <Button variant="warning float-end me-2"
                    id="wd-update-course-click"
                    onClick={onUpdateCourse}>
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

                  {showAllCourses && currentUser && (
                    isEnrolled(course._id) ? (
                      <Button variant="danger" className="float-end"
                              id="wd-unenroll-click"
                              onClick={() => onUnenroll(course._id)}>
                        Unenroll
                      </Button>
                    ) : (
                      <Button variant="success" className="float-end"
                              id="wd-enroll-click"
                              onClick={() => onEnroll(course._id)}>
                        Enroll
                      </Button>
                    )
                  )}

                  {hasPerms && ( // Faculty and Admin can delete and edit
                    <>
                      <Button onClick={(event) => {
                              event.preventDefault();
                              onDeleteCourse(course._id);
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
