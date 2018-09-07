import React from 'react';
import styled from 'styled-components';

import { PollListItem } from './PollListItem';

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const List = styled.div`
    margin: 20px 0;
    width: 70%;
`;

export const PollsList = ({ polls, removePoll, voteOnAnswer }) => (
    <Container>
        <List>
            {polls.length > 0 &&
                polls.map(({ id, question, answers }) => (
                    <PollListItem
                        key={id}
                        id={id}
                        question={question}
                        answers={answers}
                        voteOnAnswer={voteOnAnswer}
                        removePoll={removePoll}
                    />
                ))}
        </List>
    </Container>
);
