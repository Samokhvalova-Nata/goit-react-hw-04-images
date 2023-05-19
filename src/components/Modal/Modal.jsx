import PropTypes from 'prop-types';
import { Component } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalStyled } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component { 
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    };

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleClickBackdrop = e => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    };

    render() {
        return createPortal(
            <Overlay onClick={this.handleClickBackdrop}>
                <ModalStyled>
                    {this.props.children}
                </ModalStyled>
            </Overlay>,
            modalRoot,
        );
    };
};

Modal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};
