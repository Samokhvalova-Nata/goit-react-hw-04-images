import PropTypes from 'prop-types';
import { useState } from "react";
import { Header, Form, Button, SearchIcon, ButtonLabel, Input } from './Searchbar.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const Searchbar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = e => setQuery(e.currentTarget.value);

    const handleSubmit = e => {
        e.preventDefault();
        if (query.trim() === '') {
            Notify.failure('Sorry, enter something in search line.');
            return;
        }
        onSubmit(query);
    };

        return (
            <Header>
                <Form onSubmit={handleSubmit}>
                    <Button type="submit"
                        aria-label="Search">
                        <SearchIcon size={20} />
                        <ButtonLabel>Search</ButtonLabel>
                    </Button>
                    <Input autoComplete="off"
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        autoFocus
                        placeholder="Search images and photos" />
                </Form>
            </Header>
        );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};