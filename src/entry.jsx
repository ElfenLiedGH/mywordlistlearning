import React, {useState} from 'react';
import {Card, Header, Input, Button} from 'semantic-ui-react'
import wordList from './wordlist'

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    render() {
        console.log('render!')
        return (
            <Example1/>
        );
    }
}

export default function Example1() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => {
                setCount(count + 1)
            }}>
                Click me
            </button>
        </div>
    );
}

/*
export default () => {
    const [currentWord, setWord] = useState(0);
    console.log('render', currentWord)
    const nextWord = currentWord + 1 >= wordList.length ? 0 : currentWord + 1;
    const previousWord = currentWord > 0 ? currentWord - 1 : wordList.length - 1;
    return (
        <Card>
            <Card.Content>
                <Card.Header>{wordList[currentWord][0]}</Card.Header>
                <Card.Meta>{wordList[currentWord][1]}</Card.Meta>
            </Card.Content>
            <Card.Content>
                <Input placeholder={'...>>>'}/>
            </Card.Content>
            <Card.Content extra>
                <div className='ui three buttons'>
                    <Button basic color='green' onClick={() => {
                        console.log('previousWord', previousWord)
                        setWord(previousWord)
                    }}>
                        Previous
                    </Button>
                    <Button basic color='green'>
                        Approve
                    </Button>
                    <Button basic color='blue'
                            onClick={() => {
                                console.log('nextWord', nextWord)
                                setWord(nextWord)
                            }}>
                        Next
                    </Button>
                </div>
            </Card.Content>
        </Card>
    )
}
*/
