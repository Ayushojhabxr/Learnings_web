import React from 'react';
import ThemeContext from './Context api/Themecontext';
import { useContext } from 'react';

const Home = () => {
    const  {name} = useContext(ThemeContext);
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Context API Learning Home Page</h1>
            <p>Welcome, {name}!</p>
        </div>
    );
};

export default Home;