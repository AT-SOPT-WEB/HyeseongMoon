import { useState } from 'react';
import Header from './components/Header';
import NumberGame from './components/NumberGame';
import GithubSearch from './components/GithubSearch';

function App() {
    const [activeTab, setActiveTab] = useState('github');

    return (
        <>
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'github' && <GithubSearch />}
            {activeTab === 'number' && <NumberGame />}
        </>
    );
}

export default App;