
const Course = ({courses}) => {
  function findTotal (parts) {
    return parts.reduce((accumulator, part) => accumulator += part.exercises, 0);
  }

return (
  <div>
      {courses.map((course) => (
        <div key={course.id}>
          <h1>{course.name}</h1>
      {course.parts.map((part) => (
          <ul key={part.id}>
            {part.name} {part.exercises}
          </ul>
        ))}
        <p><strong>Total of {findTotal(course.parts)} exercises</strong></p>
      </div>
    ))}
  </div>
)
}

export default Course