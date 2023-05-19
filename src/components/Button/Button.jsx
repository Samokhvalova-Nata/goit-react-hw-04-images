import PropTypes from 'prop-types';
import { Btn } from './Button.styled';

export const Button = ({ children,onClick}) => { 
    return (
        <Btn type="button" onClick={onClick} aria-label="Load more">
            {children}
        </Btn>
    )
}

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
};
