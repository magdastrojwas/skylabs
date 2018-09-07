import React, { Component } from 'react';
import styled from 'styled-components';
import nano from 'nanoid';

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    label,
    input,
    span {
        margin-bottom: 5px;
    }

    button {
        margin-bottom: 20px;
    }
`;

const Form = styled.div`
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
`;

export class AddPollForm extends Component {
    state = {
        question: '',
        answers: [],
        answerInput: '',
    };

    handleQuestionInputChange = e => this.setState({ question: e.target.value });

    handleAnswerInputChange = e => this.setState({ answerInput: e.target.value });

    onAddAnswer = event => {
        event.preventDefault();

        if (this.state.answerInput !== '') {
            this.setState(previousState => ({
                answerInput: '',
                answers: [
                    ...previousState.answers,
                    {
                        id: nano(),
                        name: previousState.answerInput,
                        votes: 0,
                    },
                ],
            }));
        }
    };

    onRemoveAnswer = id =>
        this.setState(previousState => ({
            ...previousState,
            answers: previousState.answers.filter(answer => answer.id !== id),
        }));

    handlePollFormSubmit = event => {
        event.preventDefault();
        const { question, answers } = this.state;
        this.props.addPoll({ question, answers });
        this.setState({ question: '', answers: [] });
    };

    render() {
        const { answers } = this.state;

        return (
            <FormContainer>
                <Form>
                    <h3>Add new poll</h3>
                    <label>Poll question</label>
                    <input
                        type="text"
                        value={this.state.question}
                        placeholder="Question"
                        onChange={this.handleQuestionInputChange}
                    />
                    <label>Poll answers</label>
                    <input
                        type="text"
                        value={this.state.answerInput}
                        placeholder="Add answer"
                        onChange={this.handleAnswerInputChange}
                        />
                    <button onClick={this.onAddAnswer}>Add answer</button>
                        {answers.length > 0 &&
                            answers.map(answer => (
                                <span
                                    key={answer.id}
                                    onClick={e => {
                                        e.preventDefault();
                                        this.onRemoveAnswer(answer.id);
                                    }}
                                >
                                    {answer.name}
                                </span>
                            ))}
                    <button onClick={this.handlePollFormSubmit}>Add poll</button>
                </Form>
            </FormContainer>
        );
    }
}
