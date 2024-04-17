const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
  <p><b>total of exercises {total}</b></p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return(<>
  {parts.map(part =>
    <Part key={part.id} part={part}/>
  )}    
  </>)
}

const Course = ({course}) => {
  const parts = course.parts
  return (
  <>
    <Header course={course.name} />
    <Content parts={parts} />
    <Total parts={parts} />
  </>)
}

export default Course