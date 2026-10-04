const STORAGE_KEY = "courses";

export const getCourses = () => {
  const savedCourses = localStorage.getItem(STORAGE_KEY);

  return savedCourses ? JSON.parse(savedCourses) : [];
};

export const saveCourses = (courses) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
};

export const addCourse = (course) => {
  const courses = getCourses();

  const updatedCourses = [...courses, course];

  saveCourses(updatedCourses);

  return updatedCourses;
};

export const deleteCourse = (id) => {
  const courses = getCourses();

  const updatedCourses = courses.filter(
    (course) => course.id !== id
  );

  saveCourses(updatedCourses);

  return updatedCourses;
};