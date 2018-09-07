import React, { Component } from 'react';
import styled from 'styled-components';

const PollContainer = styled.div`
    margin: 25px 0;
    position: relative;

    button {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
    }

    &:hover {
        button {
            display: initial;
        }
    }
`;

const Answer = styled.div`
    margin-bottom: 20px;

    span {
        cursor: pointer;
        margin-left: 10px;
        margin-right: 5px;
    }
`;

export class PollListItem extends Component {
    render() {
        const { question, answers, removePoll, voteOnAnswer } = this.props;
        return (
            <PollContainer>
                <h2>{question}</h2>
                {answers.map(answer => (
                    <Answer key={answer.id}>
                        {answer.name} ({answer.votes})
                        <span
                            onClick={e => {
                                e.preventDefault();
                                voteOnAnswer({ pollId: this.props.id, answerId: answer.id });
                            }}
                            role="img"
                            aria-label="Vote"
                        >
                            👍
                        </span>
                    </Answer>
                ))}
                <button
                    onClick={e => {
                        e.preventDefault();
                        removePoll(this.props.id);
                    }}
                >
                    Delete poll
                </button>
            </PollContainer>
        );
    }
}
