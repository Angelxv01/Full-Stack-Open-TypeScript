import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseWithDescription {
  type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseWithDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

interface HeaderProps {
  courseName: string;
}

interface ContentProps {
  courseParts: Array<CoursePart>;
}

interface TotalProps {
  total: number;
}

const Header = (props: HeaderProps): JSX.Element => {
  return <h1>{props.courseName}</h1>;
};

const Content = (props: ContentProps): JSX.Element => {
  return (
    <>
      {props.courseParts.map((obj) => (
        <Part key={obj.name} {...obj} />
      ))}
    </>
  );
};

const Part = (props: CoursePart): JSX.Element => {
  switch (props.type) {
    case 'normal':
      return (
        <div>
          <h3>
            {props.name} {props.exerciseCount}
          </h3>
          <i>{props.description}</i>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <h3>
            {props.name} {props.exerciseCount}
          </h3>
          <p>Project exercise {props.groupProjectCount}</p>
        </div>
      );
    case 'submission':
      return (
        <div>
          <h3>
            {props.name} {props.exerciseCount}
          </h3>
          <i>{props.description}</i>
          <p>
            Submit to <a href={props.exerciseSubmissionLink}>this</a>
          </p>
        </div>
      );
    default:
      return assertNever(props);
  }
};

const Total = (props: TotalProps): JSX.Element => {
  return <p>Number of exercises {props.total}</p>;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal'
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal'
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject'
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission'
    }
  ];

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
  );
};

export default App;
