import React from 'react'

interface HeaderProps {
  courseName: string
}

interface ContentProps {
  courseParts: Array<{ name: string; exerciseCount: number }>
}

interface TotalProps {
  total: number
}

const Header = (props: HeaderProps): JSX.Element => {
  return <h1>{props.courseName}</h1>
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <>
      {props.courseParts.map((obj) => (
        <p key={obj.name}>{obj.name}</p>
      ))}
    </>
  )
}

const Total = (props: TotalProps): JSX.Element => {
  return <p>Number of exercises {props.total}</p>
}

const App = () => {
  const courseName = 'Half Stack application development'
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14
    }
  ]

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total
        total={courseParts.reduce(
          (carry, part) => carry + part.exerciseCount,
          0
        )}
      />
    </div>
  )
}

export default App
