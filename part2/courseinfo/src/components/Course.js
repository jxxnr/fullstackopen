const Header = ({ name }) => {
  return(
    <h1>{name}</h1>
  );
}

const Content = ({ parts }) => {
  const total = parts.reduce((sum, count) => sum + count.exercises, 0);
  return(
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      <strong>total of {total} exercsies</strong>
    </div>
  );
}

const Part = ({ name, exercises }) => {
  return(
    <p>{name} {exercises}</p>
  );
}

const Course = ({ course }) => {
  return(
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
}

export default Course;
//{<Content parts={course.parts}/>}