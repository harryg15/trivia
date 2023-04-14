import React from 'react';
import { AnswerButton } from './';
import { decodeHTML, randomizeArray } from '../lib';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guessed: false,
      guess: '',
    };

    // convert all answers into a single array, and randomize the array
    this.answers = randomizeArray([
      ...props.question.incorrect_answers,
      props.question.correct_answer,
    ]);
  }

  handleGuess = (answer) => {
    // set guessed to true, and set guess to the selected answer
    this.setState({ guessed: true, guess: answer });
    console.log(this.state.guess)
  };

  render() {
    return (
      <div className='card p-2 mb-4'>
        <h3 className='fw-lighter fs-5 mb-4'>{this.props.question.category}</h3>
        <h4 className='fw-light fs-5 mb-4'>
          {decodeHTML(this.props.question.question)}
        </h4>

        <div>
          {this.answers.map((answer) => (
            <AnswerButton
              key={answer}
              answer={answer}
              handleGuess={() => this.handleGuess(answer)}
            />
          ))}
        </div>

        {/* Dynamically render correct/incorrect here! */}
            
        {this.state.guessed && (
          <div>
            {this.state.guess === this.props.question.correct_answer ? (
              <span className="text-success">Correct!</span>
            ) : (
              <span className="text-danger">Incorrect!</span>
            )} 
          </div>
        )}
      </div>
    );
  }
}

export { Question };
