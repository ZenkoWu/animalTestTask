import './App.css';
import { Recommendations } from './components/Recommendations/Recommendations';
import { articles } from './mockData/mockData';

export const App = () => {
	return (
		<div className='content'>
			<Recommendations articles={articles}/>
		</div>
	)
}

