import React from "react"

const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </>
    )
}
const Header = ({ course }) => {
    return (
        <h2>{course.name}</h2>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part =>
                <Part key={part.id} part={part.name} exercises={part.exercises} />)}
        </div>
    )
}

const Part = ({ part, exercises }) => {
    return (
        <p>
            {part} {exercises}
        </p>
    )
}

const Total = ({ course }) => {
    const total = course.parts.map(item => item.exercises).reduce((previousValue, currentValue) => {
        return previousValue + currentValue
    })

    return (
        <b>total of {total} exercises</b>
    )
}

export default Course