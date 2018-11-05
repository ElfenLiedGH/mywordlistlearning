import React, {useState, useEffect} from 'react';
import {Segment, Card, Transition, Input, Button} from 'semantic-ui-react'
import wordList from './wordlist'

const ANIMATION_DURATION = 450;
const ANIMATION_TYPE_NEXT = "slide left";
const ANIMATION_TYPE_PREVIOUS = "slide right";

const WORD_PLACE_IN_ENGLISH = 0;
const WORD_PLACE_IN_RUSSIAN = 3;
const WORD_PLACE_DESCRIPTION = 2;
const WORD_PLACE_TRANSCRIPTION = 1;
const STATUS = {
    error: 'red',
    success: 'green',
    none: ''
};

export default () => {
    const [currentWord, setWord] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [textValue, setTextValue] = useState("");
    useEffect(() => {
        if (textValue.toLowerCase() === wordList[currentWord][WORD_PLACE_IN_ENGLISH].toLowerCase()) {
            setShowAnswer(true);
            setStatus(STATUS.success)
        } else if (textValue.length > (wordList[currentWord][WORD_PLACE_IN_ENGLISH] || "").length) {
            setStatus(STATUS.error)
        } else {
            setStatus(STATUS.none)
        }
    }, [textValue]);
    useEffect(() => {
        setTextValue("");
        setShowAnswer(false);
    }, [currentWord]);
    const [visible, setVisible] = useState(true);
    const [animation, setAnimation] = useState("swing left");
    const [status, setStatus] = useState("");
    const nextWord = currentWord + 1 >= wordList.length ? 0 : currentWord + 1;
    const previousWord = currentWord > 0 ? currentWord - 1 : wordList.length - 1;
    return (
        <Segment>
            <Transition animation={animation} duration={ANIMATION_DURATION} visible={visible}>
                <Card color='green' >
                    <Card.Content style={{background: status}}>
                        <Card.Header>{wordList[currentWord][WORD_PLACE_IN_RUSSIAN]}</Card.Header>
                    </Card.Content>
                    {showAnswer ?
                        <React.Fragment>
                            <Card.Content>
                                {wordList[currentWord][WORD_PLACE_IN_ENGLISH] + ' ' + wordList[currentWord][WORD_PLACE_TRANSCRIPTION]}
                            </Card.Content>
                            <Card.Content>
                                {wordList[currentWord][WORD_PLACE_DESCRIPTION]}
                            </Card.Content>
                        </React.Fragment> : null}
                    <Card.Content>
                        <Input
                            placeholder={'word'}
                            onChange={(e) => setTextValue(e.target.value)}
                            value={textValue}
                        />
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui three buttons'>
                            <Button basic color='blue'
                                    onClick={() => {
                                        setWord(previousWord);
                                        setAnimation(ANIMATION_TYPE_PREVIOUS);
                                        setVisible(false);
                                        setTimeout(() => setVisible(true), ANIMATION_DURATION)

                                    }}>
                                Previous
                            </Button>
                            <Button basic color='green' onClick={() => setShowAnswer(true)}>
                                Answer
                            </Button>
                            <Button basic color='blue'
                                    onClick={() => {
                                        setWord(nextWord);
                                        setAnimation(ANIMATION_TYPE_NEXT);
                                        setVisible(false);
                                        setTimeout(() => setVisible(true), ANIMATION_DURATION)

                                    }}>
                                Next
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </Transition>
        </Segment>
    )
}

