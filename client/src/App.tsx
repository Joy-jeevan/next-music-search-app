import React from 'react';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';

const App: React.FC = () => {
    return (
        <div>
            <h1>Next Music Search</h1>
            <SearchBar />
            <TrackList />
        </div>
    );
};

export default App;