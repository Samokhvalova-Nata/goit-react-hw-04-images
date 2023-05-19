import PropTypes from 'prop-types';
import { Component } from "react";
import { Header, Form, Button, SearchIcon, ButtonLabel, Input } from './Searchbar.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class Searchbar extends Component  {
    state = {
        query: '',
    };

    handleInputChange = e => {
        this.setState({ query: e.currentTarget.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.query.trim() === '') {
            Notify.failure('Sorry, enter something in search line.');
            return;
        }

        this.props.onSubmit(this.state.query);
        // this.setState({ query: '' });
    }

    render() {
        return (
            <Header>
                <Form onSubmit={this.handleSubmit}>
                    <Button type="submit"
                        aria-label="Search">
                        <SearchIcon size={20} />
                        <ButtonLabel>Search</ButtonLabel>
                    </Button>
                    <Input autoComplete="off"
                        type="text"
                        value={this.state.query}
                        onChange={this.handleInputChange}
                        autoFocus
                        placeholder="Search images and photos" />
                </Form>
            </Header>
        );
    };
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
