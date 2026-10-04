const STORAGE_KEY = "results";

// Get all results
export const getResults = () => {
  const savedResults =
    localStorage.getItem(STORAGE_KEY);

  return savedResults
    ? JSON.parse(savedResults)
    : [];
};

// Save results
export const saveResults = (results) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(results)
  );
};

// Add result
export const addResult = (result) => {
  const results = getResults();

  const updatedResults = [
    ...results,
    result,
  ];

  saveResults(updatedResults);

  return updatedResults;
};

// Delete result
export const deleteResult = (id) => {
  const results = getResults();

  const updatedResults = results.filter(
    (result) => result.id !== id
  );

  saveResults(updatedResults);

  return updatedResults;
};

// Delete all results of a student
export const deleteResultsByStudentId = (
  studentId
) => {
  const results = getResults();

  const updatedResults = results.filter(
    (result) =>
      String(result.studentId) !==
      String(studentId)
  );

  saveResults(updatedResults);

  return updatedResults;
};