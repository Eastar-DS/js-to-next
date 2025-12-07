import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '../../../../../../../vite.svg';
import './App.css';
import { createExampleEntity } from '@domain/example.entity';

const App = () => {
  const [count, setCount] = useState(0);

  // Path alias 테스트: @domain/* import 확인
  const exampleEntity = createExampleEntity('Clean Architecture 테스트');
  console.log('Path Alias 테스트:', exampleEntity);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          type="button"
          onClick={() => setCount((prevCount) => prevCount + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
