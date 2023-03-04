import React from 'react';
import { TextInput } from 'grommet';

const StyledTextInput = props => {
    return (
        <TextInput
            {...props}
            autoCapitalize='none'
            style={{
                ...props.style,
                fontSize: '32px',
                padding: '25px',
                borderRadius: '15px',
                border: 'none',
                backgroundColor: 'white'
            }}
        />
    );
};

export default StyledTextInput;
