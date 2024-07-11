

import Course from './components/Courses'

const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  // function findTotal () {
  //   return course.parts.reduce((accumulator, part) => accumulator += part.exercises, 0);
  // }
    
  
  // function findTotal () {
  //   let newTotal = 0
  //   course.parts.forEach(part => {
  //     newTotal += part.exercises;
  //   })
  //   return newTotal;
  // }

  // const total = findTotal();
  return (
    <div>
    <Course courses={courses} />
    {/* <p>total of {total} exercises</p> */}
    </div>
  )
}

export default App